const mongoose = require('mongoose');
// 대댓글
const Schema = mongoose.Schema;

const reCommentsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'reComments' },
  comment_id: { type: Schema.Types.ObjectId, ref: 'Comments' },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() },
});

const reComments = mongoose.model('reComments', reCommentsSchema);

module.exports = reComments;
