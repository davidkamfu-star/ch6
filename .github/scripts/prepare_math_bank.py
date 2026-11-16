"""Restore and verify every manifested bank asset, including partial cache hits."""
import concurrent.futures
import hashlib
import json
import pathlib
import subprocess
import tempfile


def matches(path, entry):
    return (path.is_file() and path.stat().st_size == entry['size']
            and hashlib.sha256(path.read_bytes()).hexdigest() == entry['sha256'])


def fetch_asset(url, target):
    subprocess.run(['curl', '--fail', '--location', '--silent', '--show-error',
                    '--retry', '3', '--max-time', '120', url, '--output', str(target)], check=True)


def restore_assets(root, entries, fetch=fetch_asset,
                   base_url='https://dse-topic-bank.davidkamfu.chatgpt.site/'):
    def restore(entry):
        rel = pathlib.PurePosixPath(entry['path'])
        if rel.is_absolute() or '..' in rel.parts:
            raise ValueError('Invalid asset path: ' + str(rel))
        target = root / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        if matches(target, entry):
            return
        # A failed or wrong download must never replace a cached file.
        with tempfile.TemporaryDirectory(dir=target.parent) as folder:
            pending = pathlib.Path(folder) / 'download'
            fetch(base_url + rel.as_posix(), pending)
            if not matches(pending, entry):
                raise ValueError('Asset checksum mismatch: ' + str(rel))
            pending.replace(target)
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(restore, entries))


def validate_banks(root, entries):
    manifested = {entry['path'] for entry in entries}
    banks = [json.loads((root / name).read_text()) for name in ['bank.json', 'bank-en.json']]
    identities = []
    for bank in banks:
        questions = bank['questions']
        if len(questions) != 262 or len(bank['topics']) != 35:
            raise ValueError('Unexpected bank coverage: ' + bank.get('language', '?'))
        identity = {}
        for q in questions:
            if q['id'] in identity:
                raise ValueError('Duplicate question ID: ' + q['id'])
            identity[q['id']] = tuple(q[key] for key in ['section', 'year', 'number', 'marks', 'topic'])
            for kind in ['student', 'teacher', 'marking']:
                if not isinstance(q.get(kind), list) or not q[kind]:
                    raise ValueError('Missing ' + kind + ': ' + q['id'])
                for seg in q[kind]:
                    if seg['asset'] not in manifested or not (root / seg['asset']).is_file():
                        raise ValueError('Missing source asset: ' + seg['asset'])
        identities.append(identity)
    if identities[0] != identities[1]:
        raise ValueError('Chinese and English question identities do not match')
    if 'pdf-lib.min.js' not in manifested or not (root / 'pdf-lib.min.js').is_file():
        raise ValueError('Missing PDF export library')


if __name__ == '__main__':
    root = pathlib.Path('math-bank')
    entries = json.loads(pathlib.Path('.github/dse-bank-manifest.json').read_text())
    restore_assets(root, entries)
    validate_banks(root, entries)
    (root / '.nojekyll').touch()
    print(f'Verified all {len(entries)} files and both 262-question banks', flush=True)
