const Mongoose = require("mongoose");
const Question = require("./QuizQuestions");
const User = require("./user")
const quizSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    // ref: "Subject"
  },
  endTime: { 
    type: String,
    required: true,
   },
  questions: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  responses: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  start: { 
    type: String,
    required: true,
   },
   teacher:{
     type: Mongoose.Schema.Types.ObjectId,
     ref: 'User'
   }
  
});

module.exports = Mongoose.model("Quiz", quizSchema);
