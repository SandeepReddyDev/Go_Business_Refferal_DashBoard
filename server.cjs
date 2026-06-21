const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.env.PORT) || 4173;
const host = '127.0.0.1';
const distDir = path.join(__dirname, 'dist');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Unable to read file');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream'
    });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${host}:${port}`);
  const requestedPath = decodeURIComponent(requestUrl.pathname);
  const assetPath = path.normalize(path.join(distDir, requestedPath));

  if (assetPath.startsWith(distDir) && fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
    sendFile(response, assetPath);
    return;
  }

  sendFile(response, path.join(distDir, 'index.html'));
});

server.listen(port, host, () => {
  console.log(`Go Business app running at http://${host}:${port}/`);
});
