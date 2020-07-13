const mongoose = require('mongoose');

const AnswerOptionSchema = new mongoose.Schema({
    optionValue: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
})

module.exports = mongoose.model("AnswerOption", AnswerOptionSchema);