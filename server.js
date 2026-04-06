const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 8080;
const publicDir = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendFile(filePath, response) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      response.end(
        error.code === "ENOENT"
          ? "404 - Archivo no encontrado"
          : "500 - Error interno del servidor"
      );
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream"
    });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(request.url, `http://${request.headers.host}`);
  const pathname = parsedUrl.pathname === "/" ? "/index.html" : parsedUrl.pathname;
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, safePath);

  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("403 - Acceso denegado");
    return;
  }

  sendFile(filePath, response);
});

server.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});
