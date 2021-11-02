const fnBoards = require('../function/boards');
const fnBoardCounts = require('../function/boardCounts');
const { isAuthorized, generateAccessToken } = require('../utils/accessToken');
const { refreshAuthorized } = require('../utils/refreshToken');

const getList = async (req, res, next) => {
  //리스트조회
  try {
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
    if (req.query.user_id) {
      //user_id param 있으면 기 조회 여부 확인 후 반영
      const param = {
        user_id: req.query.user_id,
        board_id: req.params.id,
      };
      const boardCounts = await fnBoardCounts.getBoardCountsByUser(param);
      if (boardCounts === 0) {
        const boardCount = {
          user_id: req.query.user_id,
          board_id: req.params.id,
        };
        await fnBoardCounts.store(boardCount);
      }
    } /* else {
      //비회원이 조회한 경우 조회수 증가 x
      // -> 회원의 로그인 후 조회만 조회수 증가
      const boardCount = {
        user: null,
        board: req.params.id,
      };
      await fnBoardCounts.store(boardCount);
    }*/

    const board = await fnBoards.findByPk(req.params.id);

    //data에 조회수 추가
    const boardCount = await fnBoardCounts.getBoardCounts(req.params.id);

    const data = {
      _id: board._id,
      user_id: board.user_id,
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
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    let params = {
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    };
    if (!accessTokenCheck) {
      // accessToken 만료 / refreshToken 만료 (401)
      if (!refreshTokenCheck) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // accessToken 만료 / refreshToken 유효 (201)
      else {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);
        await fnBoards.store(params);
        return res.status(201).json({ accessToken, message: 'OK' });
      }
    }
    // accessToken 유효 (200)
    else {
      await fnBoards.store(params);
      return res.status(200).json({ message: 'OK' });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const patch = async (req, res, next) => {
  //게시글 수정
  try {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    let params = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      updateDate: Date.now(),
    };
    const board = await fnBoards.findByPk(req.params.id);

    if (!accessTokenCheck) {
      // accessToken 만료 / refreshToken 만료 (401)
      if (!refreshTokenCheck) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // accessToken 만료 / refreshToken 유효 (201)
      else {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);
        //토큰 본인확인 추가 필요
        if (board.user_id !== Number(req.body.user_id)) {
          return res.status(403).json({
            message: 'Forbidden Request',
          });
        } else {
          await fnBoards.update(req.params.id, params);
          return res.status(201).json({ accessToken, message: 'OK' });
        }
      }
    }
    // accessToken 유효 (200)
    else {
      //토큰 본인확인 추가 필요
      if (board.user_id !== Number(req.body.user_id)) {
        return res.status(403).json({
          message: 'Forbidden Request',
        });
      } else {
        await fnBoards.update(req.params.id, params);
        return res.status(200).json({ message: 'OK' });
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const del = async (req, res, next) => {
  //게시글 삭제
  try {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    const board = await fnBoards.findByPk(req.params.id);

    if (!accessTokenCheck) {
      // accessToken 만료 / refreshToken 만료 (401)
      if (!refreshTokenCheck) {
        res.status(401).json({ message: 'Send new Login Request' });
      }
      // accessToken 만료 / refreshToken 유효 (201)
      else {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);
        const userId = refreshTokenCheck.id;
        if (board.user_id !== Number(userId)) {
          return res.status(403).json({
            message: 'Forbidden Request',
          });
        } else {
          await fnBoards.del(req.params.id);
          return res.status(201).json({ accessToken, message: 'OK' });
        }
      }
    }
    // accessToken 유효 (200)
    else {
      //토큰 본인확인 추가 필요
      const userId = accessTokenCheck.id;
      if (board.user_id !== Number(userId)) {
        return res.status(403).json({
          message: 'Forbidden Request',
        });
      } else {
        await fnBoards.del(req.params.id);
        return res.status(200).json({ message: 'OK' });
      }
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { getList, getOne, post, patch, del };
