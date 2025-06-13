// server.js
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  cert: fs.readFileSync("./cert/danalpay.com.cross.crt", "utf8"),
  key: fs.readFileSync("./cert/danalpay.com.key", "utf8"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log("✅ HTTPS server running on https://localhost:3000");
  });
});
