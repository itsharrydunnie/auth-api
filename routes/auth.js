const {
  registerUser,
  logInUser,
  returnUser,
} = require("../controller/controller");

const { authMiddleWare } = require("../middleware/authmiddleware");

const { parseBody } = require("../utilities/utilities");

/// match each request to the rigth controller functions

const router = function (req, res) {
  //   console.log(req);
  const { url, method, headers } = req;

  // Allows letters, numbers, underscores, hyphens
  // Length: 3–20 characters
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  const urlRegex = /^\/profile\/[a-zA-Z0-9_-]{3,20}$/;

  let token;

  res.setHeader("content-type", "application/json");

  // home
  if (url === `${"/" || "/home"}` && method === "GET") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "welcome to our application please signin or signup",
      })
    );
    return;
  }

  // POST /register
  if (url === "/register" && method === "POST") {
    parseBody(req)
      .then((data) => {
        //register user
        const result = registerUser(data);

        switch (result.status) {
          case false:
            res.statusCode = result.statusCode;
            res.end(JSON.stringify({ error: `${result.message}` }));
            break;

          case true:
            res.statusCode = result.statusCode;
            res.end(
              JSON.stringify({ message: result.message, user: result.user })
            );
            console.log(result.user);
            break;
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Something Went Wrong" }));
      });

    return;
  }

  //POST /login
  if (url === "/login" && method === "POST") {
    parseBody(req)
      .then((data) => {
        const result = logInUser(data);

        switch (result.status) {
          case false:
            res.statusCode = result.statusCode;
            res.end(JSON.stringify({ error: `${result.message}` }));
            break;

          case true:
            res.statusCode = result.statusCode;
            res.end(
              JSON.stringify({
                message: result.message,
                token: result.token,
              })
            );

            break;
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Something Went Wrong" }));
      });

    return;
  }

  /// GET /profile
  if (urlRegex.test(url) && method === "GET") {
    authMiddleWare(req, res, (username) => {
      result = returnUser(username);
      res.statusCode = result.statusCode;
      res.end(
        JSON.stringify({
          message: "Profile accessed",
          user: result.user, // comes from controller
        })
      );
    });

    return;
  }

  //Fallback for unrecognized routes

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not Found" }));
};

module.exports = router;
