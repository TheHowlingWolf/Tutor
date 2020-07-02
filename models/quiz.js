const Mongoose = require("mongoose");
const QuizQuestions = require("./QuizQuestions");

const quizSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: Mongoose.Schema.ObjectId,
    required: true,
    ref: "Subject"
  },
  questions: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  time: { type: Number }
});

module.exports = Mongoose.model("Quiz", quizSchema);
