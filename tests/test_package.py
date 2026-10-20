import importlib.util
from pathlib import Path
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('package', ROOT / 'scripts/package.py')
package = importlib.util.module_from_spec(spec)
spec.loader.exec_module(package)


class PackageTests(unittest.TestCase):
    def test_packages_reject_symlinked_source_roots(self):
        with tempfile.TemporaryDirectory(prefix='editonny package roots ') as temporary:
            base = Path(temporary)
            root, outside = base / 'project', base / 'private'
            root.mkdir()
            (outside / 'editonny').mkdir(parents=True)
            (outside / 'editonny/VERSION').write_text('1.0.0')
            (outside / 'private-notes.txt').write_text('Private content must stay outside the package')
            (root / 'skills').symlink_to(outside, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, 'symlink'):
                package.build(root, root / 'dist', 'plugin')
            self.assertFalse(list((root / 'dist').glob('*.zip')))

    def test_plugin_rejects_symlinked_readme_art(self):
        with tempfile.TemporaryDirectory(prefix='editonny readme package ') as temporary:
            root = Path(temporary) / 'project'
            source = root / 'skills/editonny'
            source.mkdir(parents=True)
            (source / 'VERSION').write_text('1.0.0')
            outside = Path(temporary) / 'private'
            outside.mkdir()
            (outside / 'note.txt').write_text('Must not enter the public package')
            assets = root / 'docs/assets'
            assets.mkdir(parents=True)
            (assets / 'readme').symlink_to(outside, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, 'symlink'):
                package.build(root, root / 'dist', 'plugin')
            self.assertFalse(list((root / 'dist').glob('*.zip')))

    def test_site_archives_are_no_longer_built(self):
        with tempfile.TemporaryDirectory(prefix='editonny package kinds ') as temp:
            root = Path(temp)
            (root / 'skills/editonny').mkdir(parents=True)
            (root / 'skills/editonny/VERSION').write_text('1.0.0')
            with self.assertRaisesRegex(ValueError, 'plugin'):
                package.build(root, root / 'dist', 'site')

    def test_plugin_package_contents_exclude_the_web_app_and_local_secrets(self):
        with tempfile.TemporaryDirectory(prefix='editonny package ') as temp:
            root = Path(temp)
            for name in ['web/package.json', 'web/src/app/[locale]/page.tsx', 'web/messages/en-US.json', 'web/.env', 'web/.next/server.js',
                         'skills/editonny/SKILL.md', 'skills/editonny/VERSION',
                         'skills/editonny/engine/.env', 'skills/editonny/engine/.venv/private',
                         'skills/editonny/old-prompts.pdf', 'skills/editonny/clip.MP4',
                         'skills/editonny/visuals/clip.webm', 'skills/editonny/visuals/still.png',
                         '.codex-plugin/plugin.json', '.claude-plugin/plugin.json',
                         'install.py', 'editonny.py', 'README.md', 'README.pt-BR.md', 'README.es.md', 'LICENSE.md',
                         'PRODUCT.md', 'DESIGN.md', 'fassa-frame.py', 'NOTICE.md', 'docs/upstream.md', 'docs/brand.md', 'design-system/README.md', 'docs/architecture.md', 'docs/design.md', 'docs/setup.md',
                         'docs/installation.md', 'docs/archive/private.pdf',
                         'docs/assets/readme/hero.svg', 'docs/assets/readme/captions.gif',
                         'docs/assets/readme/.env', 'docs/assets/private.txt']:
                p = root / name
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_text('1.0.0' if p.name == 'VERSION' else 'fixture')
            plugin = package.build(root, root / 'dist', 'plugin')
            with zipfile.ZipFile(plugin) as archive:
                self.assertIn('skills/editonny/SKILL.md', archive.namelist())
                self.assertIn('install.py', archive.namelist())
                self.assertIn('fassa-frame.py', archive.namelist())
                self.assertIn('NOTICE.md', archive.namelist())
                self.assertIn('docs/upstream.md', archive.namelist())
                self.assertIn('DESIGN.md', archive.namelist())
                self.assertTrue(all(not p.startswith('design-system/') for p in archive.namelist()))
                self.assertIn('README.pt-BR.md', archive.namelist())
                self.assertIn('README.es.md', archive.namelist())
                self.assertIn('PRODUCT.md', archive.namelist())
                self.assertIn('docs/architecture.md', archive.namelist())
                self.assertIn('docs/assets/readme/hero.svg', archive.namelist())
                self.assertIn('docs/assets/readme/captions.gif', archive.namelist())
                self.assertNotIn('docs/assets/private.txt', archive.namelist())
                self.assertTrue(all(not p.startswith('web/') for p in archive.namelist()))
                self.assertIn('skills/editonny/visuals/still.png', archive.namelist())
                self.assertIn('skills/editonny/clip.MP4', archive.namelist())
                self.assertIn('skills/editonny/visuals/clip.webm', archive.namelist())
                self.assertTrue(all(not p.lower().endswith('.pdf') for p in archive.namelist()))
                self.assertTrue(all('.env' not in p and '.venv' not in p and 'archive/' not in p for p in archive.namelist()))


if __name__ == '__main__':
    unittest.main()
