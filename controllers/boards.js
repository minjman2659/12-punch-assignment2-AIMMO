const fnBoards = require('../function/boards');
const fnBoardCounts = require('../function/boardCounts');

const getList = async (req, res, next) => {
  //리스트조회
  try {
    console.log(req.query);

    // const params = {
    //   searchWord : req.params
    // };

    const data = await fnBoards.getList(req.query);

    return res.status(200).json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  //단건조회
  try {
    if (req.query.userId) {
      //userId param 있으면 기 조회 여부 확인 후 반영
      const param = {
        userId: req.query.userId,
        boardId: req.params.id,
      };
      const boardCounts = await fnBoardCounts.getBoardCountsByUser(param);
      console.log('boardCounts', boardCounts);
      if (boardCounts === 0) {
        const boardCount = {
          user: req.query.userId,
          board: req.params.id,
        };
        await fnBoardCounts.store(boardCount);
      }
    } else {
      //비회원이 조회한 경우 조회수 증가
      const boardCount = {
        user: null,
        board: req.params.id,
      };
      await fnBoardCounts.store(boardCount);
    }

    const board = await fnBoards.findByPk(req.params.id);

    //data에 조회수 추가
    const boardCount = await fnBoardCounts.getBoardCounts(req.params.id);

    const data = {
      _id: board._id,
      usre: board.user,
      title: board.title,
      content: board.content,
      category: board.category,
      count: boardCount,
    };

    // console.log('count', count);
    // console.log(count);
    // data.boardCounts = count;
    // console.log(data);

    return res.status(200).json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

const post = async (req, res, next) => {
  //게시글 등록
  try {
    let params = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      user_id: req.body.userId,
    };

    await fnBoards.store(params);
    return res.status(200).json({ message: 'OK' });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const patch = async (req, res, next) => {
  //게시글 수정
  try {
    let params = {
      title: req.body.title,
      contents: req.body.contents,
      category: req.body.category,
    };
    const board = await fnBoards.findByPk(req.params.id);

    //토큰 본인확인 추가 필요
    if (board.user != req.body.userId) {
      return res.status(401).json({
        message: 'Not Allowed',
      });
    } else {
      await fnBoards.update(req.params.id, params);
      return res.status(200).json({ message: 'OK' });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const del = async (req, res, next) => {
  //게시글 삭제
  try {
    const board = await fnBoards.findByPk(req.params.id);

    //토큰 본인확인 추가 필요
    // if(board.userId!=req.user.id){
    //   return res.status(401).json({
    //     message: 'Not Allowed',
    //   });
    // }else{
    await fnBoards.del(req.params.id);
    return res.status(200).json({ message: 'OK' });
    // }
  } catch (e) {
    next(e);
  }
};

module.exports = { getList, getOne, post, patch, del };
