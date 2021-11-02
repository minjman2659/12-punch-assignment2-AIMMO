const mongoose = require("mongoose");
// 회원
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: String,
  name: String,
  password: String
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
