const http = require("http");
const router = require("./routes/auth.js");

const server = http.createServer((req, res) => {
  router(req, res);
});

const PORT = 5001;

server.listen(5001, () => {
  console.log(`server is running on port: ${PORT} `);
});
