"use strict";

const { createHash, randomBytes } = require("crypto");
const { create } = require("domain");

///Password Hashing
const hashPassword = function (password) {
  const hash = createHash("sha256");

  return hash.update(password).digest("hex");
};

/// Create Token
//Synchronous
const createToken = function () {
  let token = randomBytes(20);
  return token.toString("hex");
};

//// Body Parser
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  hashPassword,
  createToken,
  parseBody,
};
