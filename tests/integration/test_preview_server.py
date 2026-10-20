import http.client
import json
import unittest
from preview_fixture import running_preview


class PreviewServerTests(unittest.TestCase):
    def setUp(self):
        self.fixture = running_preview()
        self.session, self.url = self.fixture.__enter__()
        self.addCleanup(self.fixture.__exit__, None, None, None)

    def request(self, path, body=None, headers=None):
        connection = http.client.HTTPConnection('127.0.0.1', self.session.port, timeout=5)
        try:
            connection.request('POST' if body is not None else 'GET', path,
                               json.dumps(body) if body is not None else None, headers or {})
            response = connection.getresponse()
            return response.status, dict(response.headers), response.read()
        finally:
            connection.close()

    def auth(self):
        return {'Content-Type': 'application/json', 'X-Preview-Token': self.session.token}

    def test_static_modules_and_csp(self):
        code, headers, body = self.request('/api.mjs')
        self.assertEqual(code, 200)
        self.assertIn('javascript', headers['Content-Type'])
        self.assertIn(b'postJson', body)
        _, headers, _ = self.request('/')
        self.assertIn("script-src 'self'", headers['Content-Security-Policy'])

    def test_project_documents_cannot_execute_on_the_preview_origin(self):
        for name, content in [('downloaded.html', '<script>window.executed=true</script>'),
                              ('active.svg', '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"/>')]:
            (self.session.edit_dir / name).write_text(content)
            for request_headers in ({}, {'Range': 'bytes=0-9'}):
                with self.subTest(name=name, headers=request_headers):
                    code, headers, _ = self.request('/media/' + name, headers=request_headers)
                    self.assertIn(code, (200, 206))
                    self.assertEqual(headers.get('Content-Security-Policy'), "default-src 'none'; sandbox")
                    self.assertEqual(headers.get('X-Content-Type-Options'), 'nosniff')

    def test_rejects_traversal_unlisted_paths_and_hostile_host(self):
        for path in ['/../helpers/preview_server.py', '/%2e%2e/helpers/common.py', '/state.json']:
            self.assertEqual(self.request(path)[0], 404)
        self.assertEqual(self.request('/media/../outside')[0], 403)
        self.assertEqual(self.request('/', headers={'Host': 'attacker.example'})[0], 403)
        self.assertEqual(self.request('/api/state', headers={'Sec-Fetch-Site': 'cross-site'})[0], 403)

    def test_refuses_unauthenticated_and_cross_origin_writes(self):
        body = {'phase': 'cut', 'marks': []}
        self.assertEqual(self.request('/api/marks', body)[0], 403)
        self.assertEqual(self.request('/api/marks', body, {**self.auth(), 'Origin': 'https://attacker.example'})[0], 403)
        self.assertFalse((self.session.edit_dir / 'preview_marks.json').exists())
        self.assertEqual(self.request('/api/marks', body, self.auth())[0], 200)

    def test_stale_approval_does_not_overwrite_current_approval(self):
        info = self.session.file_info('cut.mp4')
        body = {'phase': 'cut', 'file': 'cut.mp4', 'file_mtime': info['mtime'], 'file_size': info['size']}
        self.assertEqual(self.request('/api/approve', body, self.auth())[0], 200)
        saved = self.session.edit_dir / 'preview_approval.json'
        before = saved.read_bytes()
        body['file_mtime'] -= 1
        self.assertEqual(self.request('/api/approve', body, self.auth())[0], 409)
        self.assertEqual(saved.read_bytes(), before)


if __name__ == '__main__':
    unittest.main()
