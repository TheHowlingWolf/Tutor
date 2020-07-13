const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({

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

module.exports = mongoose.model("Document", DocumentSchema);