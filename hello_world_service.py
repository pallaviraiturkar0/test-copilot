#!/usr/bin/env python3
"""
A simple HTTP service that responds with "Hello World".
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import sys


class HelloWorldHandler(BaseHTTPRequestHandler):
    """HTTP request handler that responds with Hello World."""
    
    def do_GET(self):
        """Handle GET requests."""
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b'Hello World')
    
    def log_message(self, format, *args):
        """Override to customize logging."""
        sys.stdout.write(f"{self.address_string()} - {format % args}\n")


def run_server(port=8000):
    """
    Start the Hello World HTTP service.
    
    Args:
        port (int): Port number to run the service on. Default is 8000.
    """
    server_address = ('', port)
    httpd = HTTPServer(server_address, HelloWorldHandler)
    print(f'Hello World service running on http://localhost:{port}')
    print('Press Ctrl+C to stop the service')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down the service...')
        httpd.shutdown()


if __name__ == '__main__':
    # Allow custom port via command line argument
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f'Invalid port number: {sys.argv[1]}. Using default port 8000.')
    
    run_server(port)
