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
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  endTime: { 
    type: String
   },
  questions: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  responses: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],
   teacher:{
     type: Mongoose.Schema.Types.ObjectId,
     ref: 'User'
   },
   duration: {
     type: Number,
     required: true
   },
   published:{
     type: Boolean,
     default: false
   }
  
});

module.exports = Mongoose.model("Quiz", quizSchema);
