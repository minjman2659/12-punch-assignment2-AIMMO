const bcrypt = require('bcrypt');
const fnUsers = require('../function/users');


//비밀번호 암호화
const hash = async (plainText) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(plainText.toString(), saltOrRounds);
};

const signup = async (req, res, next) => {
  //회원가입
  try {
    console.log(req.body);
    const user = await fnUsers.findByEmail(req.body.email);
    console.log(user);
    if (!user) {
      let params = {
        email: req.body.email,
        name: req.body.name
      };
      params.password = await hash(req.body.password);
      await fnUsers.signup(params);
      return res.status(200).json({ message: 'OK' });
    } else {
      return res.status(401).json({
        message: 'Wrong Email',
      });
    }
  } catch (e) {
    next(e);
  }
};


//로그인
const login = async (req, res, next) => {
  try {  
    const user = await fnUsers.findByEmail(req.body.email);

    if (!user) {
      return res.status(401).json({
        message: 'Wrong Email',
      });
    }else{
      // 비밀번호 compare
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(401).json({
          message: 'Wrong Password',
        });
      }

      //토큰 추가하기

      return res.status(200).json({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,       
        },
      });
    }
   
  } catch (e) {
    next(e);
  }
};

//로그아웃
const logout = async (req, res, next) => {
  try {  
    
    //토큰 제거
    
    return res.status(200).json({ message: 'OK' });    
   
  } catch (e) {
    next(e);
  }
};


module.exports = { signup, login, logout};
