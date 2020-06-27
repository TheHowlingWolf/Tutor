const Mongoose = require("mongoose");

const quizSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  classID: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "class",
    required: true,
  },
  questions: [
    {
      img: {
        data: Buffer,
        contentType: String,
      },
      quesName: [
        {
          title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
          },
          mark: {
            type: Number,
            required: true,
          },
        },
      ],
      options: [
        {
          opt: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      correctOption: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  response: [
    {
      respId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      totalCorrect: {
        type: Number,
        required: true,
      },
      totalIncorrect: {
        type: Number,
        required: true,
      },

      totalMissed: {
        type: Number,
        required: true,
      },
      allResponses: [
        {
          ques: {
            type: String,
            required: true,
            trim: true,
          },
          response: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
    },
  ],
});

Mongoose.model("Quiz", quizSchema);
