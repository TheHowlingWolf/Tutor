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
    subject:{
        type: mongoose.Types.ObjectId,
        ref: 'Subject'
      },
    standard:{
        type: Number
    },
    image: {
        data: Buffer,
        contentType: String
    },
    members: [{
        type:  mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Object,
        ref: 'User'
    },
    doc:[{
        type: Object,
        ref: 'Document'
    }],
    assignment:[{
        type: Object,
        ref: 'Assignment'
    }]

})

module.exports = mongoose.model("ClassRoom", ClassRoomSchema);