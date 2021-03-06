const User = require('../models/user');
const Subject = require('../models/Subject');
const Classroom = require('../models/Classroom');
const Class = require('../models/Class');
const Response = require('../models/Responses');
const { escapeRegex } = require('../utils/regexUtils');
const { body } = require('express-validator');

//finding user
exports.getUserById = (req, res, next, id) => {
  User.findById(id)
  .populate({ path: 'quiz', 
  model: 'Quiz',
  populate: {
    path: 'responses',
    model: 'Response'
    }
   })
  .exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No User is found in Database',
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

//Get a user's Quiz Record
exports.getOneUserQuizResult = (req, res) => {
  let QuizMarks=[];
  let index=[];
  let Quiznames=[];
  req.user.quiz.map((o,i) => {
  index.push(i+1);
  Quiznames.push(`${i+1}.${o.title}`);
    let totalMarks = parseInt(o.questions.length);
    let obtainedMarks = 0;
    o.responses.map((obj,i) => {
      if(toString(obj.student) === toString(req.user._id)){
         obtainedMarks = parseInt(obj.totalMarks);
      }
    })
    QuizMarks.push(parseInt((obtainedMarks/totalMarks)*100))
  })
  return res.status(200).json({
    QuizPercentage: QuizMarks,
    QuizIndex: index,
    Quiznames: Quiznames
  });
};

//Getting All Users
exports.getAllUsers = (req, res, next) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: 'No User found.',
      });
    }
    return res.status(200).json(users);
  });
};

//Getting All Teachers
exports.getAllTeachers = (req, res, next) => {
  User.find({ role: 1 }).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: 'No User found.',
      });
    }
    return res.status(200).json(users);
  });
};

exports.getExpiredUsers = (req, res, next) => {
  User.find({
    'subject.expiresOn': { $lt: new Date(Date.now()) },
  }).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: 'No User found.',
      });
    }
    return res.status(200).json(users);
  });
};

exports.getResponsebyUser = (req, res) => {
  User.find({ _id: req.user._id })
    .select('-img')
    .populate({
      path: 'quiz',
      model: 'Response',
      select: '-img',
      populate: {
        path: 'response',
        model: 'AnswerOption',
      },
    })
    .then((user) => {
      res.status(200).json({ data: user });
    });
};

//Getting userPic
exports.photoUser = (req, res, next) => {
  if (req.user.proPic.data) {
    res.set('Content-Type', req.doc.proPic.contentType);
    return res.send(req.doc.proPic.data);
  }
  next();
};

exports.updatedUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'Updating not authorized',
        });
      }
      req.user.salt = undefined;
      req.user.encry_password = undefined;
      req.user.createdAt = undefined;
      req.user.updatedAt = undefined;
      res.json(user);
    }
  );
};

//update
exports.getUserByEmailandUpdate = (req, res) => {
  User.find({ email: req.body.email }).exec((err, obj) => {
    if (err) {
      return res.status(400).json({
        error: 'Updating not authorized' + err,
      });
    }

    if (obj[0]) {
      User.findByIdAndUpdate(
        { _id: obj[0]._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
          if (err) {
            return res.status(400).json({
              error: 'Updating not authorized' + err,
            });
          }
          obj.salt = undefined;
          obj.encry_password = undefined;
          obj.createdAt = undefined;
          obj.updatedAt = undefined;
          res.json(user);
        }
      );
    } else {
      return res.status(400).json({
        error: 'Please register the user first',
      });
    }
  });
};

// send a json like {
//   subject_id:"hsddhkjsbkjjasdbhjadsb",
//   user_id:"bkjasbjsbajhbjhds"
// }

exports.addSubjects = (req, res) => {
  Subject.findById(req.body.subject_id)
    .then((subject) => {
      User.findById(req.body.user_id)
        .then((user) => {
          if (
            user.subject.filter(
              (subjects) => subjects._id.toString() === subject._id.toString()
            ).length > 0
          ) {
            // user.subject.findById(req.body.subject_id)
            // .then(subjects => subjects.value = req.body.value)
            // .catch(err => console.log("error in changing value "+err))
            console.log(
              typeof new Date(req.body.expiresOn),
              ':::::',
              new Date(req.body.expiresOn)
            );
            user.subject.map((obj, i) => {
              if (obj._id.toString() === subject._id.toString()) {
                obj.value = req.body.value;
                obj.expiresOn = new Date(req.body.expiresOn);
              }
            });
          } else {
            if (req.body.value !== 0) {
              subject.value = req.body.value;
            }
            subject.classes = [];
            subject.quizzes = [];
            subject.classroom = [];
            user.subject.unshift(subject);
          }

          // user.save()
          // .then(saved => res.json(saved))
          // .catch(err => console.log("subject not added to user "+err))
          User.findByIdAndUpdate(
            { _id: req.body.user_id },
            { $set: user },
            { new: true, useFindAndModify: false },
            (err, user) => {
              if (err) {
                return res.status(400).json({
                  error: 'Updating not authorized',
                });
              }
              user.salt = undefined;
              user.encry_password = undefined;
              user.createdAt = undefined;
              user.updatedAt = undefined;
              res.json(user);
            }
          );
        })
        .catch((err) => console.log('User not found ' + err));
    })
    .catch((err) => console.log('Subject not found ' + err));
};

exports.buySubjects = (req, res) => {
  const Subjects = req.body.subject;
  var updatesubject;

  User.findById(req.body.user_id)
    .then((user) => {
      updatesubject = user.subject;
      Subjects.map((sub, i) => {
        Subject.findById(sub[0].id)
          .then((subject) => {
            if (
              updatesubject.filter(
                (subjects) => subjects._id.toString() === subject._id.toString()
              ).length > 0
            ) {
              updatesubject.map(async (obj, i) => {
                if (obj._id.toString() === subject._id.toString()) {
                  // obj.value = parseInt(obj.value) + parseInt(sub[0].count);
                  if (obj.expiresOn)
                    obj.expiresOn.setMonth(
                      obj.expiresOn.getMonth() + parseInt(sub[0].count)
                    );
                  else {
                    obj.expiresOn = await Promise.resolve(new Date());
                    obj.expiresOn.setMonth(
                      obj.expiresOn.getMonth() + parseInt(sub[0].count)
                    );
                  }
                }
              });
            } else {
              subject.expiresOn = new Date();
              if (sub[0].count !== 0) {
                subject.value = sub[0].count;
                async function update() {
                  subject.expiresOn = await Promise.resolve(new Date());
                  subject.expiresOn.setMonth(
                    obj.expiresOn.getMonth() + parseInt(sub[0].count)
                  );
                }
                update();
              }

              updatesubject.unshift(subject);
            }
            user.subject = updatesubject;

            User.findByIdAndUpdate(
              { _id: req.body.user_id },
              { $set: user },
              { new: true, useFindAndModify: false },
              (err, user) => {
                if (err) {
                  return res.status(400).json({
                    error: 'Updating not authorized',
                  });
                }
                user.salt = undefined;
                user.encry_password = undefined;
                user.createdAt = undefined;
                user.updatedAt = undefined;
                return res.json({ success: true });
              }
            );
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log('User not found ' + err));
};

exports.studentClassrooms = (req, res) => {
  const subclass = [];

  User.findById(req.body.user_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No User is found in Database',
      });
    }
    const userO = user;

    Classroom.find().exec((err, cat) => {
      if (err || !cat) {
        return res.status(400).json({
          error: 'Classrooms Do Not Exist',
        });
      }
      cat.map((obj, i) => {
        userO.subject.map((o, i) => {
          if (o.name === undefined) {
            o.name = 'wrong';
          }
          if (
            obj.subject.toString() === o.name.toString() &&
            parseInt(o.value) !== 0 &&
            userO.standard.toString() === obj.standard.toString()
          ) {
            subclass.unshift(obj);

            if (
              obj.members.filter(
                (member) => member.toString() === userO._id.toString()
              ).length === 0 ||
              obj.members.length === 0
            ) {
              obj.members.unshift(userO._id);
              obj.save();
            }
          }
        });
      });
      res.json(subclass);
    });
  });
};

exports.studentClasses = (req, res) => {
  const subclass = [];

  User.findById(req.body.user_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No User is found in Database',
      });
    }
    const userO = user;

    Class.find().exec((err, cat) => {
      if (err || !cat) {
        return res.status(400).json({
          error: 'Classes Do Not Exist',
        });
      }
      cat.map((obj, i) => {
        userO.subject.map((o, i) => {
          if (o.name === undefined) {
            o.name = 'wrong';
          }
          if (
            obj.subject.toString() === o.name.toString() &&
            parseInt(o.value) !== 0 &&
            userO.standard.toString() === obj.standard.toString()
          ) {
            subclass.unshift(obj);
          }
        });
      });
      res.json(subclass);
    });
  });
};

exports.searchUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const filter = {};
    if (name) {
      const nameRegex = new RegExp(escapeRegex(name.toLowerCase()), 'gi');
      filter.name = nameRegex;
    }
    if (email) {
      const emailRegex = new RegExp(escapeRegex(email.toLowerCase()), 'gi');
      filter.email = emailRegex;
    }

    const users = await User.find(filter);

    res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'User Doesnot Exist',
    });
  }
};
