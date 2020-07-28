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
    // answers:[{
    //     type: Object,
    //     ref: 'Document'
    // }],

    type: {
        type: String,//true for uploading assignments and false for uploading Notes
        // required: true
    },
    qid:{
        type:String
    },
    // student_file: [{
    //     data: Buffer,
    //     contentType: String
    // }],
    date: {
        type:Date
    }
})
module.exports = mongoose.model("Assignmentanswer",AssignmentAnswerSchema);