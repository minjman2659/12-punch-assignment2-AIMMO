const fnRecomments = require('../function/recomments');
const { isAuthorized, generateAccessToken } = require('../utils/accessToken');
const { refreshAuthorized } = require('../utils/refreshToken');

const getList = async (req, res, next) => {
  //리스트조회
  try {
    // console.log(req.query);

    // const params = {
    //   searchWord : req.params
    // };

    const data = await fnRecomments.getList(req.query);

    return res.status(200).json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

const post = async (req, res, next) => {
  //댓글 작성
  try {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);
    let params = {
      user_id: req.body.user_id,
      comment_id: req.body.comment_id,
      content: req.body.content,
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
        await fnRecomments.store(params);
        return res.status(201).json({ accessToken, message: 'OK' });
      }
    }
    // accessToken 유효 (200)
    else {
      await fnRecomments.store(params);
      return res.status(200).json({ message: 'OK' });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = { getList, post };
