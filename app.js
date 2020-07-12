require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

//My Routes
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const classRoutes = require("./routes/class");
const noticeRoutes = require("./routes/notice");
const userRoutes = require("./routes/user");

//Connecting Mongoose-mongodb
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("Problem Logging DB...");
    throw err;
  });

//connecting the middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api", classRoutes);
app.use("/api", noticeRoutes);
app.use("/api", userRoutes);

//Connecting the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
