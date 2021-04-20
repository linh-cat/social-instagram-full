const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadConfig = require("../upload/upload");

const postController = require("../controller/postController");
const upload = multer(uploadConfig);

router.get("/", postController.getPosts);
router.post("/create-post", upload.single("image"), postController.createPost);
router.post("/liked", postController.likePost);

module.exports = router;
