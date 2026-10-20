import base64
import io
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys
import tempfile
import threading
import unittest
from unittest.mock import patch

import requests
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'skills/editonny/engine/helpers'))
import elevenlabs_api as audio
import fetch_images
import gen_image

KEY = 'synthetic-test-secret-123456789'  # gitleaks:allow (synthetic redaction fixture)


def response(content, status=200, content_type='application/json'):
    result = requests.Response()
    result.status_code = status
    result._content = content
    result.headers['Content-Type'] = content_type
    result.url = 'https://example.invalid/media'
    return result


class HttpClientTests(unittest.TestCase):
    def setUp(self):
        buffer = io.BytesIO()
        Image.new('RGB', (4, 3), 'green').save(buffer, 'PNG')
        self.png = buffer.getvalue()
        self.temp = tempfile.TemporaryDirectory(prefix='editonny HTTP ')
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        self.item = {'url': 'https://example.invalid/photo', 'download_url': 'https://example.invalid/file'}

    def test_download_writes_complete_png_atomically(self):
        with patch.object(fetch_images.requests, 'get', return_value=response(self.png)):
            result = fetch_images.download(self.item, self.directory, 'foto')
        self.assertEqual(result, {'file': 'foto.png', 'width': 4, 'height': 3})
        self.assertEqual((self.directory / 'foto.png').read_bytes(), self.png)
        self.assertEqual(len(list(self.directory.iterdir())), 1)

    def test_generated_image_and_audio_keep_bytes(self):
        data = {'choices': [{'message': {'images': [{'image_url': {
            'url': 'data:image/png;base64,' + base64.b64encode(self.png).decode()}}]}}]}
        with patch.object(gen_image.requests, 'post', return_value=response(json.dumps(data).encode())):
            self.assertEqual(gen_image.request_image({'model': 'fixture'}, KEY), self.png)
        mp3 = b'ID3' + b'\0' * 20
        with patch.object(audio.requests, 'post', return_value=response(mp3, content_type='audio/mpeg')) as post:
            self.assertEqual(audio.post_audio('https://example.invalid/audio', {}, KEY, 'Music', 5), mp3)
        self.assertFalse(post.call_args.kwargs['allow_redirects'])

    def test_errors_are_readable_and_do_not_expose_credentials(self):
        consumers = [
            ('get', lambda: fetch_images.download(self.item, self.directory, 'foto'), fetch_images.FetchError),
            ('post', lambda: gen_image.request_image({}, KEY), gen_image.GenError),
            ('post', lambda: audio.post_audio('https://example.invalid/audio', {}, KEY, 'Music', 5), audio.ElevenError),
        ]
        for method, invoke, error_type in consumers:
            for failure in [response(('upstream reflected ' + KEY).encode(), 500), requests.Timeout(KEY)]:
                with self.subTest(consumer=error_type.__name__, failure=type(failure).__name__):
                    kwargs = {'side_effect': failure} if isinstance(failure, Exception) else {'return_value': failure}
                    with patch.object(requests, method, **kwargs), self.assertRaises(error_type) as caught:
                        invoke()
                    self.assertNotIn(KEY, str(caught.exception))
                    self.assertGreater(len(str(caught.exception)), 20)
        self.assertEqual(list(self.directory.iterdir()), [])

    def test_requests_reads_chunked_response_over_loopback(self):
        class Handler(BaseHTTPRequestHandler):
            protocol_version = 'HTTP/1.1'

            def do_GET(self):
                self.send_response(200)
                self.send_header('Transfer-Encoding', 'chunked')
                self.end_headers()
                self.wfile.write(b'4\r\nedit\r\n4\r\nonny\r\n0\r\n\r\n')

            def log_message(self, *_args):
                pass

        server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()
        try:
            with requests.Session() as client:
                client.trust_env = False
                with client.get(f'http://127.0.0.1:{server.server_port}/', timeout=5) as result:
                    result.raise_for_status()
                    self.assertEqual(result.content, b'editonny')
        finally:
            server.shutdown()
            server.server_close()
            worker.join(timeout=5)


if __name__ == '__main__':
    unittest.main()
