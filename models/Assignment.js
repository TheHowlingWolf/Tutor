const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({

    teacher_file: {
        type: Buffer,
        required: true
    },
    type: {
        type: Boolean,//true for uploading assignments and false for uploading Notes
        required: true
    },
    student_file: [{
        data:Buffer
    }],
    date: {
        type:Date
    }
})
module.exports = mongoose.model("Assignment",AssignmentSchema);