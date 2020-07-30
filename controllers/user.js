const User = require("../models/user");
const Subject = require("../models/Subject");
const Classroom = require('../models/Classroom');
const Class = require('../models/Class');

//finding user
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User is found in Database",
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
          req.user.encry_password = undefined;
          req.user.createdAt = undefined;
          req.user.updatedAt = undefined;
          res.json(user);
      }
      );
}

// send a json like {
//   subject_id:"hsddhkjsbkjjasdbhjadsb",
//   user_id:"bkjasbjsbajhbjhds"
// }
exports.addSubjects = (req, res) =>{
  Subject.findById(req.body.subject_id)
  .then( subject => {
  User.findById(req.body.user_id)
  .then(user =>{
    console.log(user)
    if(user.subject.filter(
      subjects => subjects._id.toString() === subject._id.toString()
    ).length > 0){
      // user.subject.findById(req.body.subject_id)
      // .then(subjects => subjects.value = req.body.value)
      // .catch(err => console.log("error in changing value "+err))
      user.subject.map((obj,i) => {
        if(obj._id.toString() === subject._id.toString())
        {
          obj.value = req.body.value;
        }
      })
    }else{
      if(req.body.value !== 0){
      subject.value = req.body.value;}
    user.subject.unshift(subject);}
    console.log(user)
    // user.save()
    // .then(saved => res.json(saved))
    // .catch(err => console.log("subject not added to user "+err))
    User.findByIdAndUpdate({_id: req.body.user_id},
      {$set: user},
      {new: true,useFindAndModify: false},
      (err,user) => {
          if(err){
              return res.status(400).json({
                  error: "Updating not authorized"
              })
          }
          user.salt = undefined;
          user.encry_password = undefined;
          user.createdAt = undefined;
          user.updatedAt = undefined;
          res.json(user);
      }
      );
  })
  .catch(err => console.log("User not found "+err))
})
.catch(err => console.log("Subject not found "+ err))
}

exports.studentClassrooms = (req,res) => {
  const subclass = []
  console.log(req.body)
  User.findById(req.body.user_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User is found in Database",
      });
    }
    const userO = user;

  Classroom.find().exec((err, cat) => {
    if(err || !cat){
        return res.status(400).json({
            error: "Classrooms Do Not Exist"
        })
    }
    cat.map((obj, i) => {
      userO.subject.map((o,i)=>{
        if(o.name === undefined){o.name = "wrong"}
        if((obj.subject.toString() === o.name.toString())&&((parseInt(o.value) !== 0))
        // &&(o.standard === obj.standard.toString())
        ){
          subclass.unshift(obj)
          
          if (
            (obj.members.filter(
              member => member.toString() === userO._id.toString()
            ).length === 0)||(obj.members.length === 0)
          ) {
            console.log("hi");
            obj.members.unshift(userO._id);
                obj
                  .save()
          }
        }
      })
    })
    res.json(subclass);
})
}
)

}

exports.studentClasses = (req,res) => {
  const subclass = []
  // console.log(req.body)
  User.findById(req.body.user_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User is found in Database",
      });
    }
    const userO = user;

  Class.find().exec((err, cat) => {
    if(err || !cat){
        return res.status(400).json({
            error: "Classes Do Not Exist"
        })
        
    }
    cat.map((obj, i) => {
      userO.subject.map((o,i)=>{
        if(o.name === undefined){o.name = "wrong"}
        if((obj.subject.toString() === o.name.toString())&&((parseInt(o.value) !== 0))
        // &&(o.standard === obj.standard.toString())
        ){
          subclass.unshift(obj)
        }
      })
    })
    res.json(subclass);
})
}
)

}
