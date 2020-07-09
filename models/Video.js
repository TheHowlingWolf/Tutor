const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    videoLink: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description :{
        type: String
    },
    dateUploaded:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Video", VideoSchema);