const Recomment = require('../schemas/recomments');

// 리스트 조회
const getList = async (params) => {
  const recomments = Recomment.find({ comment_id: params.comment_id })
    .skip(Number(params.offset))
    .limit(Number(params.limit));
  return recomments;
};

// 댓글 작성
const store = async (params) => {
  const addRecomment = new Recomment(params);
  const recomment = await addRecomment.save();
  return recomment;
};

module.exports = { getList, store };
