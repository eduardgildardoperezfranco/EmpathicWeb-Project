const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set CORS headers for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Handle form submissions for testing
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Form submission received:', body);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Form submitted successfully!</h1><p>Check console for form data.</p>');
    });
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    // Set content type based on file extension
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    switch (ext) {
      case '.css': contentType = 'text/css'; break;
      case '.js': contentType = 'text/javascript'; break;
      case '.json': contentType = 'application/json'; break;
      case '.png': contentType = 'image/png'; break;
      case '.jpg': contentType = 'image/jpeg'; break;
      case '.mp4': contentType = 'video/mp4'; break;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Test the contact form at: http://localhost:8000/contact.html');
});