#!/usr/bin/env python3
"""Fassa Frame: local video editing and visual scenes, guided by conversation."""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import unicodedata
import webbrowser

SKILL = Path(__file__).resolve().parents[1]
ENGINE = SKILL / 'engine'
VISUALS = SKILL / 'visuals'


def normalize(value):
    return ''.join(c for c in unicodedata.normalize('NFKD', value.casefold()) if not unicodedata.combining(c))


def catalog(query=''):
    scenes = json.loads((VISUALS / 'catalog.json').read_text(encoding='utf-8'))['scenes']
    words = normalize(query).split()
    return [scene for scene in scenes if all(word in normalize(json.dumps(scene, ensure_ascii=False)) for word in words)]


def doctor(as_json=False):
    checks = []
    def check(name, ok, detail, required=True):
        checks.append(dict(name=name, ok=bool(ok), detail=detail, required=required))
    check('Launcher Python', sys.version_info >= (3, 9), sys.version.split()[0])
    for name in ('uv', 'ffmpeg', 'ffprobe', 'node', 'npx'):
        path = shutil.which(name)
        check(name, path, path or f'{name} not found on PATH')
    python = ENGINE / '.venv' / ('Scripts/python.exe' if os.name == 'nt' else 'bin/python')
    if python.exists():
        try:
            result = subprocess.run([str(python), '-c',
                'import numpy, PIL, cv2, onnxruntime; import sys; print(sys.version.split()[0])'],
                capture_output=True, text=True, timeout=30)
            check('Python engine', result.returncode == 0, result.stdout.strip() or 'Dependencies are incomplete; run install.py again.')
        except (OSError, subprocess.TimeoutExpired) as error:
            check('Python engine', False, str(error))
    else:
        check('Python engine', False, 'Environment missing. Run uv sync --locked in the skill engine directory.')
    try:
        scenes = catalog()
        missing = [c['id'] for c in scenes if not (VISUALS / 'scenes' / (c['id'] + '.html')).is_file()]
        check('Visual catalog', not missing, f'{len(scenes)} scenes; {len(missing)} missing files')
    except (OSError, ValueError, KeyError) as error:
        check('Visual catalog', False, str(error))
    check('HyperFrames', True, 'Pinned in engine/project-template/package.json; the first render may download the package.', False)
    report = {'product': 'fassa-frame', 'version': (SKILL / 'VERSION').read_text().strip(),
              'ok': all(c['ok'] for c in checks if c['required']), 'checks': checks}
    if as_json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(f"Fassa Frame {report['version']} — local diagnostic")
        for c in checks:
            print(f"{'OK' if c['ok'] else 'MISSING'} · {c['name']}: {c['detail']}")
        print('This diagnostic does not replace a render test or final video review.')
    return 0 if report['ok'] else 1


def guide(port, open_browser):
    # The guide is the Next.js app in web/ of the full checkout; the standalone skill does not include it.
    root = SKILL.parent.parent
    if not (root / 'web' / 'package.json').is_file():
        raise ValueError('The guide is not bundled with the standalone skill. Open the full project and run python3 editonny.py guide.')
    npm = shutil.which('npm')
    if not npm or not (root / 'node_modules' / 'next').is_dir():
        raise ValueError('Install the guide dependencies first: run npm ci in the project folder (Node.js 22.13+ or 24+).')
    # Loopback only. Next.js 16.4 treats its locale rewrites as external when bound to 127.0.0.1 and redirects in a loop.
    command = [npm, 'run', 'dev', '-w', '@editonny/web', '--', '--hostname', 'localhost', '--port', str(port)]
    print('Fassa Frame · starting the guide · Ctrl+C to stop', flush=True)
    process = subprocess.Popen(command, cwd=root, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    url = None
    try:
        for line in process.stdout:
            print(line, end='', flush=True)
            found = re.search(r'http://localhost:\d+', line)
            url = url or (found.group(0) if found else None)
            # Open only once the server is ready, at the port it reported (Next picks one for --port 0).
            if open_browser and url and 'Ready' in line:
                webbrowser.open(url)
                open_browser = False
        return process.wait()
    except KeyboardInterrupt:
        process.terminate()
        process.wait()
        return 0


def run(command, cwd=None):
    return subprocess.call([str(c) for c in command], cwd=cwd,
        env={**os.environ, 'EDITONNY_ENGINE_DIR': str(ENGINE)})


def main(argv=None):
    argv = list(sys.argv[1:] if argv is None else argv)
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    p = sub.add_parser('doctor', help='check the environment and files without installing tools')
    p.add_argument('--json', action='store_true')
    p = sub.add_parser('catalog', help='search visual scenes by name, category, or use')
    p.add_argument('query', nargs='*')
    p.add_argument('--json', action='store_true')
    p = sub.add_parser('new', help='create an editing project from a cut')
    p.add_argument('project', type=Path)
    p.add_argument('--edit', required=True, type=Path)
    p.add_argument('--style', default='paper', choices=['amber', 'paper', 'night'])
    sub.add_parser('scene', help='apply visual scenes; use scene --help for options')
    sub.add_parser('media', help='bundled media: media status [--json] | media import FOLDER')
    sub.add_parser('helper', help='run an engine helper: helper NAME [arguments]')
    p = sub.add_parser('guide', help='open the local web guide')
    p.add_argument('--port', type=int, default=4173)
    p.add_argument('--no-open', action='store_true')
    try:
        if argv and argv[0] == 'media':
            return run([sys.executable, VISUALS / 'media.py', *argv[1:]])
        if argv and argv[0] == 'scene' and len(argv) > 1 and argv[1] in ('-h', '--help'):
            return run([sys.executable, VISUALS / 'apply.py', '--help'])
        if argv and argv[0] == 'scene':
            return run([sys.executable, VISUALS / 'apply.py', *argv[1:]])
        if argv and argv[0] == 'helper':
            if len(argv) < 2:
                raise ValueError('Use helper NAME [arguments]. See engine/helpers for available names.')
            name = argv[1].removesuffix('.py')
            if not re.fullmatch(r'[a-z][a-z0-9_]*', name) or not (ENGINE / 'helpers' / f'{name}.py').is_file():
                raise ValueError(f'Unknown helper: {name}')
            uv = shutil.which('uv')
            if not uv:
                raise ValueError('uv not found. Install uv before running the engine.')
            # Preserve the caller directory so relative media paths remain valid.
            return run([uv, 'run', '--locked', '--project', ENGINE, 'python', ENGINE / 'helpers' / f'{name}.py', *argv[2:]])
        args = parser.parse_args(argv)
        if args.command == 'doctor':
            return doctor(args.json)
        if args.command == 'catalog':
            scenes = catalog(' '.join(args.query))
            if args.json:
                print(json.dumps(scenes, ensure_ascii=False, indent=2))
            else:
                for scene in scenes:
                    print(f"{scene['id']} · {scene.get('category', 'Scene')} · {scene.get('name', scene.get('title', ''))}")
                print(f'{len(scenes)} scenes found.')
            return 0
        if args.command == 'new':
            return run([sys.executable, ENGINE / 'project-template/build.py', 'new', args.project.expanduser().resolve(),
                        '--edit', args.edit.expanduser().resolve(), '--style', args.style])
        if args.command == 'guide':
            return guide(args.port, not args.no_open)
    except (OSError, ValueError, KeyError, subprocess.SubprocessError) as error:
        print(f'Error: {error}', file=sys.stderr)
        return 2
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
