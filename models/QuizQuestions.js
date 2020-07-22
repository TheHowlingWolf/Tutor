const mongoose = require('mongoose');
const AnswerOptions = require('./AnswerOptions');

const QuestionSchema = new mongoose.Schema({
    title: { type: String },
    img: {
        data: Buffer,
        contentType: String
    },
    hasImg: { type: Boolean, default: false },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnswerOptions'
    }],
    
    numCorrect: { type: Number, default: 1 },

})

module.exports = mongoose.model("Question", QuestionSchema);    