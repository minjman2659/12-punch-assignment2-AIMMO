const fnBoards = require('../function/boards');

const getList = async (req, res, next) => {
  //리스트조회
  try {
    console.log(req.query);

    // const params = {
    //   searchWord : req.params
    // };
    
    const data = await fnBoards.getList(req.query);

    return res.status(200).json({
      data
    });

  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  //단건조회
  try {
    const data = await fnBoards.findByPk(req.params.id);
   
    return res.status(200).json({
      data
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
      user: req.body.userId
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
      category: req.body.category
    };
    const board = await fnBoards.findByPk(req.params.id);
    

    //토큰 본인확인 추가 필요
    if(board.user!=req.body.userId){
      return res.status(401).json({
        message: 'Not Allowed',
      });
    }else{
      await fnBoards.update(req.params.id,params);
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
}

module.exports = { getList, getOne, post, patch, del};
