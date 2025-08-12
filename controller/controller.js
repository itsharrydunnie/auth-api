const users = require("../data/users");

const registerUser = function (data) {
  // First we check if user exists, by checking if email is available on any of the users and if username is available
  if (users.some((user) => user.email === data.email)) {
    return { status: false, message: "email already exit" };
  }

  if (users.some((user) => user.userName === data.userName)) {
    return { status: false, message: "username already exit" };
  }

  /// Create new user
  const newUser = {
    name: data.name,
    email: data.email,
    userName: data.userName,
    password: data.password,
  };

  users.push(newUser);

  //   return { ifUserExist, userNameTaken };
  return { status: true, message: "user sucessfully created", newUser };
};

const logInUser = function (logInInfo) {};

// const isUserTaken = function (users, email, userName) {
//   return users.some(
//     (user) => user.email === email || user.userName === userName
//   );
// };

module.exports = {
  registerUser,
  logInUser,
};
