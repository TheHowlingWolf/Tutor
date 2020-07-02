const mongoose = require('mongoose');
const AnswerOptions = require('./AnswerOptions');

const QuestionSchema = new mongoose.Schema({
    Quetion: { Type: String },
    img: {
        data: Buffer,
        contentType: String
    },
    hasImg: { type: Boolean, default: false },
    options: [AnswerOptions],
    numCorrect: { type: Number, default: 1 }
})

module.exports = mongoose.model("Question", QuestionSchema);    