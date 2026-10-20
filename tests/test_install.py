import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('installer', ROOT / 'install.py')
installer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(installer)


class InstallationTests(unittest.TestCase):
    def test_install_includes_videos_images_and_manifest(self):
        folder = self.source / 'visuals/assets/visuals/video'
        folder.mkdir(parents=True)
        for name in ('clip.MP4', 'object.webm', 'still.png'):
            (folder / name).write_bytes(b'fixture')
        (self.source / 'visuals/media.json').write_text('{}')
        dest = self.install()
        self.assertTrue((dest / 'visuals/media.json').is_file())
        self.assertEqual({p.name for p in (dest / folder.relative_to(self.source)).iterdir()},
                         {'clip.MP4', 'object.webm', 'still.png'})

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='editonny test ')
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.source = self.base / 'source'
        self.source.mkdir()
        (self.source / 'SKILL.md').write_text('---\nname: fassa-frame\n---\n')
        (self.source / 'VERSION').write_text('1.0.0\n')
        (self.source / 'engine').mkdir()
        (self.source / 'engine' / 'pyproject.toml').write_text('[project]\nname="test"\n')
        (self.source / '.env').write_text('PRIVATE=never-copy\n')
        (self.source / '.venv').mkdir()
        (self.source / '.venv' / 'private').write_text('not shipped')
        self.home = self.base / 'user home'

    def install(self, **kwargs):
        return installer.install(self.source, self.home, sync=False, **kwargs)

    def test_single_copy_and_two_links_idempotent(self):
        dest = self.install()
        self.assertEqual(dest, self.home / '.local/share/fassa-frame')
        for p in ['.agents/skills/fassa-frame', '.claude/skills/fassa-frame']:
            self.assertTrue((self.home / p).is_symlink())
            self.assertEqual((self.home / p).resolve(), dest.resolve())
        self.assertFalse((dest / '.env').exists())
        self.assertFalse((dest / '.venv').exists())
        before = (dest / 'SKILL.md').stat().st_mtime_ns
        self.install()
        self.assertEqual((dest / 'SKILL.md').stat().st_mtime_ns, before)

    def test_existing_upstream_installation_is_untouched(self):
        old = self.home / '.local/share/editonny'
        old.mkdir(parents=True)
        (old / 'SKILL.md').write_text('upstream installation')
        link = self.home / '.agents/skills/editonny'
        link.parent.mkdir(parents=True)
        link.symlink_to(old)
        dest = self.install()
        self.assertNotEqual(dest, old)
        self.assertEqual((link / 'SKILL.md').read_text(), 'upstream installation')

    def test_target_claude_does_not_register_codex(self):
        self.install(target='claude')
        self.assertFalse((self.home / '.agents').exists())
        self.assertTrue((self.home / '.claude/skills/fassa-frame').is_symlink())

    def test_dry_run_creates_nothing(self):
        self.install(dry_run=True)
        self.assertFalse(self.home.exists())

    def test_foreign_link_or_directory_refused_before_copy(self):
        for kind in ['directory', 'symlink']:
            with self.subTest(kind=kind):
                link = self.home / '.claude/skills/fassa-frame'
                link.parent.mkdir(parents=True, exist_ok=True)
                if kind == 'directory':
                    link.mkdir()
                else:
                    link.symlink_to(self.source, target_is_directory=True)
                with self.assertRaisesRegex(ValueError, 'belong|unowned|existing'):
                    self.install()
                self.assertFalse((self.home / '.local/share/fassa-frame').exists())
                if link.is_symlink():
                    link.unlink()
                else:
                    link.rmdir()

    def test_update_keeps_env_and_original_backup(self):
        dest = self.install()
        (dest / 'engine/.env').write_text('LOCAL=keep\n')
        (dest / 'engine/custom.txt').write_text('personal file')
        (self.source / 'VERSION').write_text('1.1.0\n')
        self.install()
        self.assertEqual((dest / 'engine/.env').read_text(), 'LOCAL=keep\n')
        backups = list((self.home / '.local/share/fassa-frame-backups').iterdir())
        self.assertEqual(len(backups), 1)
        self.assertEqual((backups[0] / 'engine/custom.txt').read_text(), 'personal file')

    def test_reinstall_repairs_media_and_preserves_env_and_damaged_backup(self):
        (self.source / 'clip.webm').write_bytes(b'original')
        dest = self.install()
        (dest / 'engine/.env').write_text('LOCAL=keep\n')
        for index, damage in enumerate(('missing', 'corrupt'), 1):
            with self.subTest(damage=damage):
                video = dest / 'clip.webm'
                if damage == 'missing':
                    video.unlink()
                else:
                    video.write_bytes(b'personal edit')
                self.install()
                self.assertTrue(video.is_file())
                self.assertEqual(video.read_bytes(), b'original')
                self.assertEqual((dest / 'engine/.env').read_text(), 'LOCAL=keep\n')
                backups = sorted((self.home / '.local/share/fassa-frame-backups').iterdir())
                self.assertEqual(len(backups), index)
                if damage == 'corrupt':
                    self.assertEqual((backups[-1] / 'clip.webm').read_bytes(), b'personal edit')
        self.install()
        self.assertEqual(len(list((self.home / '.local/share/fassa-frame-backups').iterdir())), 2)

    def test_failed_sync_restores_old_install(self):
        dest = self.install()
        (self.source / 'VERSION').write_text('2.0.0\n')
        with patch.object(installer.shutil, 'which', return_value='/test/uv'), \
                patch.object(installer, 'sync_engine', side_effect=RuntimeError('sync failed')):
            with self.assertRaisesRegex(RuntimeError, 'sync failed'):
                installer.install(self.source, self.home, sync=True)
        self.assertEqual((dest / 'VERSION').read_text(), '1.0.0\n')
        self.assertTrue((self.home / '.claude/skills/fassa-frame').is_dir())

    def test_unregister_preserves_installation_and_secrets(self):
        dest = self.install()
        (dest / '.env').write_text('LOCAL=keep')
        installer.uninstall(self.home, target='both')
        self.assertFalse((self.home / '.agents/skills/fassa-frame').exists())
        self.assertTrue((dest / '.env').exists())

    def test_source_symlink_not_followed(self):
        secret = self.base / 'secret.txt'
        secret.write_text('private')
        (self.source / 'linked.txt').symlink_to(secret)
        with self.assertRaisesRegex(ValueError, 'link'):
            self.install()


if __name__ == '__main__':
    unittest.main()
