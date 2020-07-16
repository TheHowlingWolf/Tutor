const User = require("../models/user");

//finding user
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User in found in Database",
      });
    }
    req.user = user;
    next();
  });
  
};

//Selecting one user
exports.getOneUser = (req, res) => {
  req.user.salt = undefined;
  req.user.encry_password = undefined;
  req.user.proPic = undefined;
  return res.status(200).json(req.user);
};

//Getting All Users
exports.getAllUsers = (req, res, next) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No User found.",
      });
    }
    return res.status(200).json(users);
  });
};

//Getting userPic
exports.photoUser = (req, res, next) => {
  if (req.user.proPic.data) {
    res.set("Content-Type", req.doc.proPic.contentType);
    return res.send(req.doc.proPic.data);
  }
  next();
};

exports.updatedUser = (req, res) =>{
  console.log("hello")
  User.findByIdAndUpdate({_id: req.user._id},
      {$set: req.body},
      {new: true,useFindAndModify: false},
      (err,user) => {
          if(err){
              return res.status(400).json({
                  error: "Updating not authorized"
              })
          }
          req.user.salt = undefined;
          req.user.encryptedpassword = undefined;
          req.user.createdAt = undefined;
          req.user.updatedAt = undefined;
          res.json(user);
      }
      );
}
