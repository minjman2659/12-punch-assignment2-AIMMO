const mongoose = require("mongoose");
// 게시판
const Schema = mongoose.Schema;

const boardCountsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Comments" },
  board: { type: Schema.Types.ObjectId, ref: "Boards" }
});

const BoardCounts = mongoose.model("BoardCounts", boardCountsSchema);

module.exports = BoardCounts;
