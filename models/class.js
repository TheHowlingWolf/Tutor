const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({

    classLink: {
        type: String,
        required: true
    },
    name:{
        type: String,
        // required: true
    },
    email:{
        type: String,
        // required: true
    },
    subject: {
        type: String,
        required: true
    },
    standard:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    
})

module.exports = mongoose.model("Class", ClassSchema);