const mongoose = require('mongoose');
const Question = require("./QuizQuestions");

const AnswerOptionSchema = new mongoose.Schema({
    optionValue: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
})

module.exports = mongoose.model("AnswerOption", AnswerOptionSchema);