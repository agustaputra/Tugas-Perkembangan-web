const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 8081;

// Fungsi untuk menentukan tipe konten berdasarkan ekstensi file
const getContentType = (ext) => {
  switch (ext) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".ico":
      return "image/x-icon";
    default:
      return "text/plain";
  }
};

// Membuat server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);

  // Jika root ('/'), tampilkan index.html
  let filePath = req.url === "/" ? "index.html" : req.url.substring(1);

  // Cegah akses keluar folder proyek
  filePath = path.resolve(__dirname, filePath);

  // Cek apakah file ada
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("404 - File Not Found");
    } else {
      const ext = path.extname(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", getContentType(ext));
      res.end(data);
    }
  });
});

// Jalankan server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
