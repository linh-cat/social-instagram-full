const db = require("../config/db");

module.exports = {
  async register(req, res) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const { username, email, password, confirmPassword, address } = req.body;
    const testMail = {
      email,
    };

    // check valid  field input
    if (!username || !email || !password || !confirmPassword) {
      res.json({
        status: "error",
        message: "Input please fill out all field!",
      });
      return;
    }

    // Check email format

    if (emailRegexp.test(email) === false) {
      res.json({
        status: "error",
        message: "Not email input!",
      });
      return;
    }

    // check passwords match
    if (password !== confirmPassword) {
      res.json({
        status: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    // check password length
    if (password.length < 6) {
      res.json({
        status: "error",
        message: "Password should be at least 6 characters!",
      });
      return;
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [testMail.email],
      (err, result) => {
        if (err) throw err;
        let user = JSON.parse(JSON.stringify(result));
        if (user.length > 0) {
          // console.log(user);
          res.json({ status: "error", message: "Email is already registered" });
          return;
        } else {
          db.query(
            "INSERT INTO users (username, email, password, address)  VALUES (?, ?, ?, ?);",
            [username, email, password, address],
            (err, result) => {
              if (err) throw err;
              res.json({
                status: "success",
                message: "Register successfully!",
              });
            }
          );
        }
      }
    );
  },

  login(req, res) {
    const { email, password } = req.body;
    const testMail = {
      email,
    };

    if (!email || !password) {
      res.json({
        status: "error",
        message: "Email or password not empty",
      });
      return;
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) throw err;
      let user = JSON.parse(JSON.stringify(result));
      // console.log(user);
      if (user.length > 0) {
        if (password === user[0].password) {
          res.json({
            loggedIn: true,
            userId: user[0].id,
            username: user[0].username,
          });
        } else {
          res.json({
            loggedIn: false,
            message: "Wrong username/password combo!",
          });
        }
      } else {
        res.json({
          loggedIn: false,
          message: "User doesn't exist",
        });
      }
    });
  },

  async getUserById(req, res) {
    let id = req.params.id;

    db.query("select * from users where id  = ?;", id, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};
