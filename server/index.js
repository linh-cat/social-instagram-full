const express = require("express");
const app = express();
const path = require("path");
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/files", express.static(path.resolve(__dirname, "image", "resized")));

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
