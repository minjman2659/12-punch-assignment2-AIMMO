const mongoose = require("mongoose");
// 회원
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
