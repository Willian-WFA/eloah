const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { extname, join, normalize, resolve } = require("node:path");

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const publicDir = resolve("public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/health") {
      sendJson(res, 200, { ok: true, app: "rpg-kids" });
      return;
    }

    if (url.pathname === "/api/master" && req.method === "POST") {
      await readBody(req);
      sendJson(res, 200, {
        mode: "mock",
        narration:
          "O mestre ouviu sua ideia e guardou no diário da aventura. A integração real com DeepSeek entra depois.",
        tokenUsage: {
          provider: "mock",
          inputTokens: 0,
          outputTokens: 0,
          estimatedCost: 0,
        },
      });
      return;
    }

    if (url.pathname.startsWith("/api/")) {
      sendJson(res, 404, { error: "api_route_not_found" });
      return;
    }

    await serveStatic(url.pathname, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "internal_server_error" });
  }
});

server.listen(port, host, () => {
  console.log(`RPG Kids rodando em http://${host}:${port}`);
});

async function serveStatic(pathname, res) {
  const requestedPath = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(join(publicDir, safePath));

  if (!filePath.startsWith(publicDir)) {
    sendText(res, 403, "Acesso negado");
    return;
  }

  try {
    const body = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath)] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch {
    const indexBody = await readFile(join(publicDir, "index.html"));
    res.writeHead(200, {
      "Content-Type": mimeTypes[".html"],
      "Cache-Control": "no-cache",
    });
    res.end(indexBody);
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function readBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        req.destroy();
        rejectBody(new Error("request_body_too_large"));
      }
    });
    req.on("end", () => resolveBody(body));
    req.on("error", rejectBody);
  });
}
