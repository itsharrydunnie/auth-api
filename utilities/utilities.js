"use strict"

const {createHash, randomBytes} = require("crypto");
const { create } = require("domain");

///Password Hashing
const hashPassword = function (password) {
    const hash = createHash("sha256")

    return hash.update(password).digest("hex")
};



/// Create Token
//Synchronous
const createToken = function(){
let token = randomBytes(20)
return token.toString("hex")
}

console.log(createToken())

module.exports={
    hashPassword,
    createToken
}