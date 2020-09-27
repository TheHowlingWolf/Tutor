const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
  },
  {
    timestamps: true, //this timestamp records the time of entry in the db
  }
);

SubscriberSchema.plugin(uniqueValidator, {
  message: 'Email is already registered!',
});
module.exports = mongoose.model('Subscriber', SubscriberSchema);
