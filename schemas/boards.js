const mongoose = require('mongoose');
// 게시판
const Schema = mongoose.Schema;

const boardsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  createDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() },
});

const Boards = mongoose.model('Boards', boardsSchema);

module.exports = Boards;
