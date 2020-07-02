const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model("Class", ClassSchema);