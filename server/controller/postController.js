const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

module.exports = {
  async getPosts(req, res) {
    db.query("SELECT * FROM posts ORDER BY id DESC", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  async createPost(req, res) {
    const { author, location, body } = req.body;

    const { filename: image } = req.file;

    // console.log(req.file);
    const [name] = image.split(".");

    const filename = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", filename));

    fs.unlinkSync(req.file.path);

    db.query(
      "INSERT INTO posts (body, location, image, author) VALUES (?, ?, ?, ?);",
      [body, location, filename, author],
      (err, result) => {
        if (err) throw err;
        res.send({
          status: "success",
          message: "Create post successfully!",
        });
      }
    );
  },

  async likePost(req, res) {
    const { userLiking, postId } = req.body;

    db.query(
      "INSERT INTO likes (userLiking, post_id) VALUES (?, ?);",
      [userLiking, postId],
      (err, result) => {
        if (err) throw err;
        db.query(
          "UPDATE posts SET likes = likes + 1 WHERE id = ?",
          postId,
          (err, result1) => {
            if (err) throw err;
            res.send(result);
          }
        );
      }
    );
  },
};
