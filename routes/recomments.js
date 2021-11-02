const express = require('express');
const router = express.Router();
const Recomment = require('../controllers/recomments');

/* 댓글 */
router.route('/').get(Recomment.getList); //리스트 조회
router.route('/').post(Recomment.post); //대댓글 작성

module.exports = router;
