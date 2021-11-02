const User = require('../schemas/users');
const mongoose = require('mongoose');

const signup = async (params) => {
  const addUser = new User(params);
  const user = await addUser.save();
  return user;
};

const findByPk = async (_id) => {
  const user = await User.find({ _id: new mongoose.mongo.ObjectId(_id) });
  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

const deleteUser = async (_id) => {
  const result = await User.remove({ _id: _id });
  return result;
};

module.exports = { signup, findByPk, findByEmail, deleteUser};
