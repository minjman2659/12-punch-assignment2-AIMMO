const Board = require('../schemas/boards');
const mongoose = require('mongoose');

//리스트 조회 + 검색
const getList = async (params) => {
  console.log("fn_boards: ");
  console.log(params);
  let where = {};
  if (params.category != undefined) {
    where.category = new RegExp(params.category, 'i');
  }
  if (params.title != undefined) {
    where.title = new RegExp(params.title, 'i');
  }

  console.log("fn_boards_where: ")
  console.log(where);
  const boards = await Board.find(where)
    .skip(Number(params.offset))
    .limit(Number(params.limit));
  return boards;
};

//pk로 단건 조회
const findByPk = async (_id) => {
  const board = await Board.findOne({ _id: new mongoose.mongo.ObjectId(_id) });
  return board;
};

//추가
const store = async (params) => {
  const addBoard = new Board(params);
  const board = await addBoard.save();
  return board;
};

//수정
const update = async (_id, params) => {
  const board = await Board.findByIdAndUpdate(_id, params);
  console.log(board);
  return board;
};

//삭제
const del = async (_id) => {
  const result = await Board.remove({ _id: _id });
  return result;
};

module.exports = { getList, findByPk, store, update, del };
