const mongoose = require('mongoose');

const ClassRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    files: {
        type: mongoose.Types.ObjectId,
        ref: 'Assignment'
    }

})

module.exports = mongoose.model("ClassRoom", ClassRoomSchema);