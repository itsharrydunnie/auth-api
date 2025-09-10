const { getUsers, loadUsers } = require("../data/users");
const { hashPassword, createToken } = require("../utilities/utilities");
const { addUser } = require("../data/users");

loadUsers();

const registerUser = function (data) {
  // if all data fields are valid
  if (!isDataValid(data)) {
    return {
      status: false,
      statusCode: 400,
      message: "Invalid input. Please check your fields.",
    };
  }

  // First we check if user exists, by checking if email is available on any of the users
  if (
    getUsers().some(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    )
  ) {
    return { status: false, statusCode: 409, message: "Email already exit" };
  }

  /// Create new user
  const newUser = {
    name: data.name,
    email: data.email,
    userName: data.userName,
    password: hashPassword(data.password),
  };

  addUser(newUser);

  //   return { ifUserExist, userNameTaken };
  return {
    status: true,
    statusCode: 201,
    message: "User sucessfully created",
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  };
};

const logInUser = function (logInInfo) {
  // if all data fields are valid
  if (!isDataValid(logInInfo)) {
    return {
      status: false,
      statusCode: 400,
      message: "Invalid input. Please check your fields.",
    };
  }

  /// we first check to see if theres a user with that account
  const user = getUserByEmail(logInInfo.email);

  if (user) {
    // we check if password match
    if (hashPassword(logInInfo.password) === user.password) {
      user.token = createToken();
      console.log(user, getUsers());
      return {
        status: true,
        statusCode: 200,
        message: `Welcome ${user.name}. logged in sucessfully`,
        token: user.token,
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "Invalid credentials. Please input valid email or password",
      };
    }
  } else {
    return {
      status: false,
      statusCode: 400,
      message: "user not found",
    };
  }
};

function returnUser(username) {
  user = getUserByUsername(username);
  return {
    status: true,
    statusCode: 200,
    user: {
      name: user.name,
      username: user.userName,
      email: user.email,
    },
  };
}

const isDataValid = function (data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // if allvvalues are string
  for (const values of Object.values(data)) {
    if (typeof values !== "string") {
      return false;
    }
  }

  // if email is correcct
  if (!emailRegex.test(data?.email)) {
    return false;
  }

  // for password length
  if (!data?.password || data.password.length < 8) {
    return false;
  }

  return true;
};

const getUserByEmail = function (email) {
  return getUsers().find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

const getUserByUsername = function (username) {
  return getUsers().find((user) => user.userName === username);
};

console.log(getUserByUsername("harrydunnie2"), "line126");

module.exports = {
  registerUser,
  logInUser,
  returnUser,
  getUserByEmail,
  getUserByUsername,
};
