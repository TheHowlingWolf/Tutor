

const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    response:[{
        type: mongoose.Types.ObjectId,
        ref: 'AnswerOption',
        required: true
    }],    
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    totalMarks:{
        type: Number,
        default: 0
    }
},
  {
    timestamps: true, //this timestamp records the time of entry in the db
  }
)


module.exports = mongoose.model('Response', ResponseSchema);
// const ResponseSchema = new mongoose.Schema({
    // respId: {
    //     type: Mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //     required: true,
    // },
    // totalCorrect: {
    //     type: Number,
    //     required: true,
    // },
    // totalIncorrect: {
    //     type: Number,
    //     required: true,
    // },

    // totalMissed: {
    //     type: Number,
    //     required: true,
    // },
    // allResponses: [
    //     {
    //         ques: {
    //             type: String,
    //             required: true,
    //             trim: true,
    //         },
    //         response: {
    //             type: String,
    //             required: true,
    //             trim: true,
    //         },
    //     },
    // ],
// })


