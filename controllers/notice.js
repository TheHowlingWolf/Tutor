const NoticeO = require('../models/Notice');

exports.getNoticeById = (req, res, next, id) => {
  NoticeO.findById(id).exec((err, obj) => {
    if (err || !obj) {
      return res.status(400).json({
        error: 'No such Notice exists',
      });
    }
    req.NoticeO = obj;
    next();
  });
};
exports.createNotice = (req, res) => {
  const noticeO = new NoticeO(req.body);
  noticeO.save((err, noticeO) => {
    if (err || !noticeO) {
      console.log(err);
      return res.status(400).json({
        error: 'Please enter all the fields!',
      });
    }
    res.json({ noticeO });
  });
};

exports.getAllNotices = (req, res) => {
  NoticeO.find().exec((err, cat) => {
    if (err || !cat) {
      return res.status(400).json({
        error: "Notice doesn't exist",
      });
    }
    res.json(cat);
  });
};

exports.getANotice = (req, res) => {
  return res.json(req.NoticeO);
};

exports.removeNotice = (req, res) => {
  const noticeO = req.NoticeO;

  noticeO.remove((err, cat) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete Notice',
      });
    }
    res.json({
      message: cat.title + ' Notice deleted',
    });
  });
};

exports.updateNotice = (req, res) => {
  const noticeO = req.NoticeO;
  noticeO.title = req.body.title;
  noticeO.description = req.body.description;
  noticeO.date = req.body.date;

  noticeO.save((err, updatednoticeO) => {
    if (err || !updatednoticeO) {
      return res.status(400).json({
        error: 'Notice not saved ' + err,
      });
    }
    res.json(updatednoticeO);
  });
};
