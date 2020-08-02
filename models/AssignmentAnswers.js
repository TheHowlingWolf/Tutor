const mongoose = require('mongoose')

const AssignmentAnswerSchema = new mongoose.Schema({
    
    photo: {
        data: Buffer,
        contentType: String
    },
    name:{
        type: String
    },
    uploader:{
        type: String
    },

    type: {
        type: String,
    },
    qid:{
        type:String
    },
    date: {
        type:Date
    }
})
module.exports = mongoose.model("Assignmentanswer",AssignmentAnswerSchema);