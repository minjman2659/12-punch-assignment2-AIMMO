const User = require('../schemas/users');
const mongoose = require('mongoose');

//회원가입
const signup = async (params) => {
  const addUser = new User(params);
  const user = await addUser.save();
  return user;
};

//pk로 단건 조회
const findByPk = async (_id) => {
  const user = await User.findOne({ _id: new mongoose.mongo.ObjectId(_id) });
  return user;
};

//이메일로 단건 조회
const findByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

//삭제
const deleteUser = async (_id) => {
  const result = await User.remove({ _id: _id });
  return result;
};

module.exports = { signup, findByPk, findByEmail, deleteUser};
