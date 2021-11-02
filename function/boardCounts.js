const BoardCounts = require('../schemas/boardCounts');
const mongoose = require('mongoose');

//해당 회원의 게시글 조회여부 확인
const getBoardCountsByUser = async (params) => {
    const boardCounts = await BoardCounts.count({ user_id: new mongoose.mongo.ObjectId(params.user_id), board_id: new mongoose.mongo.ObjectId(params.board_id) });
  return boardCounts;
};

//boardId로 게시글 조회수 확인
const getBoardCounts = async (boardId) => {
  const boardCounts = await BoardCounts.count({ board_id: new mongoose.mongo.ObjectId(boardId) });
return boardCounts;
};

//추가
const store = async (params) => {
  const addBoardCounts = new BoardCounts(params);
  const boardCounts = await addBoardCounts.save();
  return boardCounts;
};


module.exports = { getBoardCountsByUser, getBoardCounts, store};
