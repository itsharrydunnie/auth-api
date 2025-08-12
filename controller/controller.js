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

const logInUser = function (logInInfo) {
  /// we first check to see if theres a user with that account
  const user = checkUser(logInInfo.email);
  console.log(user);
  if (user) {
    // we check if password match
    if (logInInfo.password === user.password) {
      return {
        status: true,
        message: `Welcome ${user.name}`,
        userData: { userInfo: "All data about users goes hear" },
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

// const isUserTaken = function (users, email, userName) {
//   return users.some(
//     (user) => user.email === email || user.userName === userName
//   );
// };

module.exports = {
  registerUser,
  logInUser,
  dataValid,
};
