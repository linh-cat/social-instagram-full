const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadConfig = require("../upload/upload");

const postController = require("../controller/postController");
const { route } = require("./user");
const upload = multer(uploadConfig);

router.get("/", postController.getPosts);
router.post("/create-post", upload.single("image"), postController.createPost);
router.post("/liked", postController.likePost);
router.get("/:postId", postController.siglePost);
router.post("/comment/:postId", postController.commentPost);
router.get("/comment/:postId", postController.getCommentPost);
router.delete("/:id", postController.detelePost);

module.exports = router;
