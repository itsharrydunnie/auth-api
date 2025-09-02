const {
  registerUser,
  logInUser,
  dataValid,
  checkUser,
  getUser,
} = require("../controller/controller");

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

  if (url === "/home" && method === "GET") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "welcome to our application please signin or signup",
      })
    );
  } else if (url === "/register" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        // check to see we have a valid data
        dataValid(data);

        const result = registerUser(data);

        switch (result.status) {
          case false:
            res.statusCode = 401;
            res.end(JSON.stringify({ error: `${result.message}` }));
            break;

          case true:
            res.statusCode = 201;
            res.end(
              JSON.stringify({ message: result.message, user: result.newUser })
            );
            console.log(result.newUser);
            break;
        }
      } catch (error) {
        console.log(error.message, "missing value");
        res.statusCode = 404;
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else if (url === "/login" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        // check to see we have a valid data
        dataValid(data);

        //if we do call our login
        const result = logInUser(data);

        switch (result.status) {
          case false:
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `${result.message}` }));
            break;

          case true:
            loggedin = result.login;
            res.statusCode = 200;
            res.end(
              JSON.stringify({ message: result.message, user: result.userData })
            );
            token = result.userData.token;
            break;
        }
      } catch (error) {
        console.log(error.message, "missing value");
        res.statusCode = 404;
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else if (urlRegex.test(url) && method === "GET") {
    try {
      const userName = url.split("/")[2];
      const requiredToken = headers["authorization"].split(" ")[1];
      if (!requiredToken) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "unauthorized" }));
      }

      if (requiredToken !== token) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "invalid token" }));
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ user: userName, message: "sucess" }));
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "server error" }));
    }

    // if (loggedin) {
    //   const user = getUser(userName);
    //   res.statusCode = 200;
    //   res.end(JSON.stringify({ user: user }));
    // } else {
    //   res.statusCode = 404;
    //   res.end(JSON.stringify({ error: "please login" }));
    // }
  }
};

module.exports = router;
