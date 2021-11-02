const express = require('express');
const router = express.Router();
const Board = require ('../controllers/boards');

/* 게시글 */
router.route("/").get(Board.getList); //리스트 조회
router.route("/:id").get(Board.getOne); //단건 조회
router.route("/").post(Board.post); //게시글 작성
router.route("/:id").patch(Board.patch); //게시글 수정
router.route("/:id").delete(Board.del); //게시글 삭제

module.exports = router;