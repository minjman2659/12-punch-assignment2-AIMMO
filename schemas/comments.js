const mongoose = require('mongoose');
// 댓글
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "Users" },
  board_id: { type: Schema.Types.ObjectId, ref: "Boards" },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() },
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
