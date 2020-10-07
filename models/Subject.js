const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    value: {
        type: Number
    },
    standard: {
        type: Number,
        required: true
    },
    expiresOn: {
        type: Date
    },
    teacher:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    classes:[{
        type: mongoose.Types.ObjectId,
        ref: "Class"
    }],
    classroom:[{
        type: mongoose.Types.ObjectId,
        ref: "ClassRoom"
    }],
    quizzes:[{
        type: mongoose.Types.ObjectId,
        ref: "Quiz"
    }]
})

module.exports = mongoose.model("Subject", SubjectSchema);