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
        type: Object,
        ref: 'User'
    }],
    owner: {
        type: Object,
        ref: 'User'
    },
    files: {
        type: Object,
        ref: 'Assignment'
    }

})

module.exports = mongoose.model("ClassRoom", ClassRoomSchema);