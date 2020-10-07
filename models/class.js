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
        type: mongoose.Types.ObjectId,
        ref: 'Subject'
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    standard:{
        type: String,
        
    },
    time:{
        type: String,
        // required: true
    },
    date:{
        type: Date,
        // required: true
    },
    
})

module.exports = mongoose.model("Class", ClassSchema);