const { registerUser, logInUser } = require("../controller/controller");

/// match each request to the rigth controller functions

const router = function (req, res) {
  //   console.log(req);
  const { url, method } = req;

  // Allows letters, numbers, underscores, hyphens
  // Length: 3–20 characters
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  const urlRegex = /^\/profile\/[a-zA-Z0-9_-]{3,20}$/;

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

        const dataIsValid = Object.values(data).some(
          (value) => typeof value !== "string" || value === ""
        );

        if (dataIsValid) {
          throw new Error("data missing or not valid");
        }

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
  } else if (urlRegex.test(url) && method === "GET") {
  }
};

module.exports = router;
