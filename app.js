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
const paymentRoutes = require("./routes/payment");

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
app.use("/api", paymentRoutes);

// //Serve static assets
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('./tution/build'));

//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'tution','build', 'index.html'))
//   })
// }

app.get('/logo.svg',(req,res)=>{
 
  res.sendFile(path.join(__dirname,'logo.svg'))
})

//Connecting the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
