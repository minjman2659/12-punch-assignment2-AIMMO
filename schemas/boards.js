const mongoose = require("mongoose");
// 게시판
const Schema = mongoose.Schema;

const boardsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  title: String,
  content: String,
  category: String,
  createDate : Date,
  updateDate : Date  
});

const Boards = mongoose.model("Boards", boardsSchema);

module.exports = Boards;
