const { registerUser } = require("../controller/controller");

/// match each request to the rigth controller functions

const router = function (req, res) {
  //   console.log(req);
  const { url, method } = req;

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

        const dataIsValid = Object.keys(data).some((key) => key === "");

        if (dataIsValid) {
          registerUser(data);

          res.statusCode = 201;
          res.end(JSON.stringify({ message: "user created succesfully" }));
        } else {
          throw new Error("data missing");
        }
      } catch (error) {
        console.log(error, "missing value");
      }
    });
  }
};

module.exports = router;
