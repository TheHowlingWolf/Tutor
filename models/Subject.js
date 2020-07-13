const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    paymentStatus: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Subject", SubjectSchema);