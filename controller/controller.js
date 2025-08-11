const users = require("../data/users");

const registerUser = function (data) {
  // First we check if user exists, by checking if email is available on any of the users and if username is available
  const ifUserExist = users.some((e) => e.email === "user2@gmail.com");
  const userNameTaken = users.some((e) => e.userName === "user2");

  const newUser = {
    name: data.name,
    email: data.email,
    userName: data.userName,
    password: data.password,
  };

  users.push(newUser);

  //   return { ifUserExist, userNameTaken };
  return newUser;
};

console.log(
  registerUser({
    email: "user1@gmail.com",
    userName: "user1",
    password: "",
  })
);
console.log(
  registerUser({
    email: "user2@gmail.com",
    userName: "user2",
    password: "happiness",
  })
);

module.exports = {
  registerUser,
};
