const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    classLink: {
        type: String,
        required: true
    },
    teacher:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    time:{
        type: Date.prototype.setHours,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    category:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Class", ClassSchema);