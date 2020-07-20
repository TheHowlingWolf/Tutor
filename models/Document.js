const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
    
    photo: {
        data: Buffer,
        contentType: String
    },
    name:{
        type: String
    },

    type: {
        type: String,//true for uploading assignments and false for uploading Notes
        // required: true
    },
    // student_file: [{
    //     data: Buffer,
    //     contentType: String
    // }],
    // date: {
    //     type:Date
    // }
})
module.exports = mongoose.model("Assignment",AssignmentSchema);