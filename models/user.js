const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    standard: {
      type: String,
      required: true
    },
    classRoom: [{
      type: mongoose.Types.ObjectId,
      ref: 'ClassRoom'
    }],
    // physics: {
    // type: Number,
    // default: 0
    // },
    // chemistry: {
    //     type: Number,
    //     default: 0
    // },
    // maths: {
    //     type: Number,
    //     default: 0
    // },
    // biology: {
    //     type: Number,
    //     default: 0
    // },
    subject:[{
      type: mongoose.Types.ObjectId,
      ref: 'Subject'
    }],
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mob: {
      type: Number,
      trim: true,
      unique: true,
      required: true,
    },
    //Todo Come back here
    encry_password: {
      type: String,
      required: true,
    },
    //Salt for Passwords
    salt: String, //defined in virtuals
    //Defining Roles
    role:{
      type: Number, //Higher the number higher the priviledges
      default: 0,
    },
    proPic: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true, //this timestamp records the time of entry in the db
  }
);

//Virtuals to set password

userSchema
  .virtual("password")
  .set(function (password) {
    //to declare a private variable use _
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  //Password authentication check
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  //Password encryption using crypto
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

//throw mongoose model("Name we want to call", Defined schema name)
module.exports = mongoose.model("User", userSchema);
