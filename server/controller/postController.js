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

  async singlePost(req, res) {
    let postId = req.params.postId;
    db.query("SELECT * FROM posts WHERE id = ?;", postId, (err, result) => {
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

  async detelePost(req, res) {
    let id = req.params.id;

    db.query("DELETE FROM posts WHERE id = ?", id, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  async commentPost(req, res) {
    let postId = req.params.postId;
    let { username, body } = req.body;
    db.query(
      "insert into comment (username, body) values (?, ?);",
      [username, body],
      (err, result) => {
        if (err) throw err;
        let result1 = JSON.parse(JSON.stringify(result));
        if (result1) {
          db.query(
            "insert into posts_comment (post_id, comment_id)  values (?, ?);",
            [postId, result1.insertId]
          );
        }
      }
    );
  },

  async getCommentPost(req, res) {
    let postId = req.params.postId;

    db.query(
      "select comment.username, comment.body from posts_comment join posts on posts_comment.post_id = posts.id join comment on posts_comment.comment_id = comment.id where  posts.id = ?;",
      postId,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  },

  async getPostById(req, res) {
    let postId = req.params.id;

    db.query("select *  from posts where id = ?", postId, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  async getPostByUser(req, res) {
    let username = req.params.username;

    db.query(
      "select * from posts where author = ?",
      username,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  },
};
