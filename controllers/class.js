const ClassO = require('../models/Class');
const Subject = require('../models/Subject');
const { getSubjectById } = require('./subject');
const User = require('../models/user');

exports.getClassById = (req, res, next, id) => {
  ClassO.findById(id).exec((err, obj) => {
    if (err || !obj) {
      return res.status(400).json({
        error: 'No such Class exists',
      });
    }
    req.classO = obj;
    next();
  });
};

exports.createClass = (req, res) => {
  const classO = new ClassO(req.body);
  classO.save((err, classO) => {
    if (err || !classO) {
      console.log(err);
      return res.status(400).json({
        error: 'Please enter all the fields!',
      });
    }
    res.json({ classO });
  });
};

exports.createClassInSubject = (req, res) => {
  const classO = new ClassO(req.body);
  classO.save().then(async (cls) => {
    const pushClass = await Promise.resolve(req.subject.classes.push(cls));
    req.subject
      .save()
      .then((sub) => res.status(200).json(cls))
      .catch((err) => {
        classO
          .findByIdAndDelete(classO._id)
          .then((data) => {
            res.status(403).json({ error: 'Cannot Add Class' });
          })
          .catch((err) => {
            console.log('Class Deletion Failed: ', err);
          });
      });
  });
};

exports.getAllClasses = (req, res) => {
  ClassO.find()
    .populate('subject')
    .exec((err, cat) => {
      if (err || !cat) {
        return res.status(400).json({
          error: "class doesn't exist" + err,
        });
      }
      res.json(cat);
    });
};
exports.getAClass = (req, res) => {
  return res.json(req.classO);
};

exports.removeClass = (req, res) => {
  const classO = req.classO;

  Subject.updateOne(
    { _id: req.classO.subject },
    { $pull: { classes: { $in: [req.classO._id] } } },
    (err, cls) => {
      if (err || !cls) {
        return res.status(400).json({
          error: 'Class not deleted',
        });
      }
      classO.remove((err, clss) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to delete class',
          });
        }
      });
      res.json(cls);
    }
  );
};

exports.updateClass = (req, res) => {
  const classO = req.classO;
  classO.classLink = req.body.classLink;
  classO.subject = req.body.subject;
  classO.standard = req.body.standard;
  classO.time = req.body.time;
  classO.date = req.body.date;
  classO.save((err, updatedclassO) => {
    if (err || !updatedclassO) {
      return res.status(400).json({
        error: 'class not saved' + err,
      });
    }
    res.json(updatedclassO);
  });
};

exports.getUserClass = (req, res) => {
  User.findById(req.user._id).exec(async (err, userO) => {
    if (err || !userO) {
      console.log(err);
    }
    let classess = [];
    let c = 0;

    userO.subject.map((y) => {
      if (y.expiresOn > Date.now()) {
        Subject.findById(y._id)
          .populate({
            path: 'classes',
            populate: {
              path: 'subject',
              select: 'name',
            },
          })
          .then((sub) => {
            sub.classes.forEach((e) => {
              classess.push(e);
            });
            c = c + 1;
            if (userO.subject.length == c) {
              res.json(classess);
            }
          });
      } else {
        c = c + 1;
      }
    });
    if (userO.subject.length == c) {
      res.json(classess);
    }
  });
};
