const Subject = require('../models/Subject');

exports.getSubjectById = (req, res, next, id) => {
  Subject.findById(id).exec((err, sub) => {
    if (err || !sub) {
      return res.status(400).json({
        error: 'No such Subject exists' + err,
      });
    }
    req.subject = sub;
    next();
  });
};

exports.addSubject = (req, res) => {
  const subject = new Subject(req.body);
  subject
    .save()
    .then((sub) => {
      res.json({ sub });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message: 'Cannot Add Subject',
      });
    });
};

exports.getAllSubjects = (req, res) => {
  Subject.find()
    .populate({ path: 'teacher', select: 'name' })
    .exec((err, sub) => {
      if (err || !sub) {
        return res.status(400).json({
          error: "Subjects doesn't exist",
        });
      }
      res.json(sub);
    });
};

exports.getASubject = (req, res) => {
  return res.json(req.subject);
};

exports.removeSubject = (req, res) => {
  const subject = req.subject;

  subject.remove((err, sub) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete subject',
      });
    }
    res.json({
      message: sub.name + ' subject deleted',
    });
  });
};

exports.updateSubject = (req, res) => {
  const subject = req.subject;
  subject.name = req.body.name;
  subject.price = req.body.price;
  subject.value = req.body.value;
  subject.standard = req.body.standard;
  subject.expiresOn = req.body.expiresOn;
  subject.teacher = req.body.teacher;

  subject.save((err, updatedsubject) => {
    if (err || !updatedsubject) {
      return res.status(400).json({
        error: 'subject not saved' + err,
      });
    }
    res.json(updatedsubject);
  });
};
