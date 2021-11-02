const express = require('express');
const router = express.Router();
const User = require ('../controllers/users');

/* 회원 */
router.route("/signup").post(User.signup); //회원가입
router.route("/login").post(User.login); //로그인
router.route("/logout").get(User.logout); //로그아웃


module.exports = router;