const { getUserByUsername } = require("../controller/controller");

const jwt = require("jsonwebtoken");

function createJwtToken() {
  jwt.sign(
    { foo: "bar" },
    "privateKey",
    { algorithm: "RS256" },
    (err, token) => {
      console.log(token);
    }
  );
}

createJwtToken();

function authMiddleWare(req, res, next) {
  //first we check to see if theres an authorization header
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ message: "Unauthorized" }));
  }

  //then we check for username and toke
  const token = authHeader.split(" ")[1];
  const userName = req.url.split("/")[2];

  // we get the userfirst if thereis
  user = getUserByUsername(userName);

  //then we compare token from the user, gotten with the username
  if (getUserByUsername(userName).token !== token) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ message: "Unauthorized,InvalidToken" }));
  }

  next(userName);
}

module.exports = {
  authMiddleWare,
};
