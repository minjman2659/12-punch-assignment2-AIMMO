const mongoose = require("mongoose");
// 댓글
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Comments" },
  board: { type: Schema.Types.ObjectId, ref: "Boards" },
  content: String,
  createDate : Date,
  updateDate : Date  
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
