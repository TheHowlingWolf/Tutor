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
  standard: {
    type: String,
    required: true
  },
  endTime: { 
    type: String
   },
  questions: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  responses: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  start: { 
    type: String
   },
   teacher:{
     type: Mongoose.Schema.Types.ObjectId,
     ref: 'User'
   },
   duration: {
     type: Number,
     required: true
   }
  
});

module.exports = Mongoose.model("Quiz", quizSchema);
