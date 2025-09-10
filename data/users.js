const fs = require("fs");

let users = [];

// start of program read file and save against login
function loadUsers() {
  try {
    const usersFromFile = fs.readFileSync(`./data/users.json`, "utf-8");
    users = JSON.parse(usersFromFile);
  } catch (error) {
    console.log(error);
    users = [];
  }
  console.log("Users loaded:", users);
}

// save all users to file
function saveUsers() {
  fs.writeFileSync(`./data/users.json`, JSON.stringify(users));
  console.log("Users saved successfully");
}

// writeToFile(users);

/// save new user and add to file
function addUser(newUser) {
  users.push(newUser);
  saveUsers();
  loadUsers();
}

function getUsers() {
  return users;
}

//// will be used during log in and registration

module.exports = {
  addUser,
  loadUsers,
  getUsers,
};
