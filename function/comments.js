const Comment = require('../schemas/comments');

// 리스트 조회
const getList = async (params) => {
  const comments = Comment.find({ board_id: params.board_id })
    .skip(Number(params.offset))
    .limit(Number(params.limit));
  return comments;
};

// 댓글 작성
const store = async (params) => {
  const addComment = new Comment(params);
  const comment = await addComment.save();
  return comment;
};

module.exports = { getList, store };
