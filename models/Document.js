const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    document: {
        data: Buffer,
        contentType: String,
        required: true
    },
    title: {
        type: String
    },
    description :{
        type: String
    }
    },
    {
        timestamps: true, //this timestamp records the time of entry in the db
    }
    )

module.exports = mongoose.model("Document", DocumentSchema);