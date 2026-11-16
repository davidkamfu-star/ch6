import hashlib
import importlib.util
import pathlib
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('prepare', pathlib.Path(__file__).with_name('prepare_math_bank.py'))
prepare = importlib.util.module_from_spec(spec)
spec.loader.exec_module(prepare)


def entry(name, data):
    return {'path': name, 'size': len(data), 'sha256': hashlib.sha256(data).hexdigest()}


class CacheRestoreTests(unittest.TestCase):
    def test_partial_cache_with_existing_en_directory_still_restores_runtime(self):
        with tempfile.TemporaryDirectory() as folder:
            root = pathlib.Path(folder)
            (root / 'en/assets').mkdir(parents=True)
            called = []
            def fetch(url, target):
                called.append(url)
                target.write_bytes(b'PDF runtime')
            prepare.restore_assets(root, [entry('pdf-lib.min.js', b'PDF runtime')], fetch)
            self.assertEqual((root / 'pdf-lib.min.js').read_bytes(), b'PDF runtime')
            self.assertEqual(len(called), 1)

    def test_good_cache_is_reused_but_corrupt_pdf_is_repaired(self):
        with tempfile.TemporaryDirectory() as folder:
            root = pathlib.Path(folder)
            (root / 'good.pdf').write_bytes(b'good')
            (root / 'bad.pdf').write_bytes(b'broken')
            called = []
            def fetch(url, target):
                called.append(url)
                target.write_bytes(b'repaired')
            prepare.restore_assets(root, [entry('good.pdf', b'good'), entry('bad.pdf', b'repaired')], fetch)
            self.assertEqual(len(called), 1)
            self.assertTrue(called[0].endswith('/bad.pdf'))
            self.assertEqual((root / 'bad.pdf').read_bytes(), b'repaired')

    def test_wrong_download_does_not_overwrite_cached_file(self):
        with tempfile.TemporaryDirectory() as folder:
            root = pathlib.Path(folder)
            (root / 'source.pdf').write_bytes(b'original')
            def fetch(url, target):
                target.write_bytes(b'404 HTML')
            with self.assertRaisesRegex(ValueError, 'checksum mismatch'):
                prepare.restore_assets(root, [entry('source.pdf', b'expected')], fetch)
            self.assertEqual((root / 'source.pdf').read_bytes(), b'original')

    def test_invalid_manifest_path_is_rejected_before_fetch(self):
        with tempfile.TemporaryDirectory() as folder:
            def fetch(url, target):
                self.fail('must not fetch an unsafe manifest path')
            with self.assertRaisesRegex(ValueError, 'Invalid asset path'):
                prepare.restore_assets(pathlib.Path(folder), [entry('../escape', b'x')], fetch)


if __name__ == '__main__':
    unittest.main()
