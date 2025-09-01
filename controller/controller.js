const users = require("../data/users");
const { hashPassword, createToken } = require("../utilities/utilities");

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
    password: hashPassword(data.password),
    token: createToken(),
  };

  users.push(newUser);

  //   return { ifUserExist, userNameTaken };
  return {
    status: true,
    message: "user sucessfully created",
    user: {
      name: newUser.name,
      email: newUser.email,
      username: newUser.userName,
    },
  };
};

const logInUser = function (logInInfo) {
  /// we first check to see if theres a user with that account
  const user = checkUser(logInInfo.email);
  console.log(user);
  if (user) {
    // we check if password match
    if (hashPassword(logInInfo.password) === user.password) {
      return {
        status: true,
        message: `Welcome ${user.name}`,
        userData: {
          name: user.name,
          email: user.email,
          username: user.userName,
          token: user.token,
        },
      };
    } else {
      return { status: false, message: "invalid credentials" };
    }
  } else {
    return { status: false, message: "user not found" };
  }
};

const dataValid = function (data) {
  const dataIsValid = Object.values(data).some(
    (value) => typeof value !== "string" || value === ""
  );

  if (dataIsValid) {
    throw new Error("data missing or not valid");
  }
};

const checkUser = function (email) {
  return users.find((user) => user.email === email);
};
const getUser = function (userName) {
  return users.find((user) => user.userName === userName);
};

// const isUserTaken = function (users, email, userName) {
//   return users.some(
//     (user) => user.email === email || user.userName === userName
//   );
// };

//

module.exports = {
  registerUser,
  logInUser,
  dataValid,
  checkUser,
  getUser,
};
