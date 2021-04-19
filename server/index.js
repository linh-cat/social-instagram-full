const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/user");

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
