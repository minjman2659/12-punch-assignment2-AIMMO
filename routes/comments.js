const express = require('express');
const router = express.Router();
const Comment = require('../controllers/comments');

/* 댓글 */
router.route('/').get(Comment.getList); //리스트 조회
router.route('/').post(Comment.post); //댓글 작성

module.exports = router;
