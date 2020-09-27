const Subscriber = require('../models/subscriber');

exports.createSubscriber = (req, res) => {
  const newSub = new Subscriber(req.body);
  newSub
    .save()
    .then((subs) => {
      console.log(subs);
      res.json(subs);
    })
    .catch((err) => {
      res.status(403).json({ error: `${err}` });
    });
};

exports.getAllSubscriber = (req, res) => {
  Subscriber.find()
    .then((subs) => {
      return (req.subscribers = subs);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendAllNewsLetter = async (req, res) => {
  const { subject, bodyMsg, imgUrl } = req.body;
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'llloki@yahoo.com', // generated ethereal user
      pass: 'What123@', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Effervescence 👨‍🎓" <llloki@yahoo.com>', // sender address
    to: 'theuniqueraj@gmail.com,rahul.122293@gmail.com,1829041@kiit.ac.in', // list of receivers
    subject: `${subject}`, // Subject line
    html: `<div
      style="
        background: #ffffff;
        color: #222326;
        padding: 20px;
        justify-content: center;
        text-align: center;
      "
    >
      <img src="${imgUrl}" alt="Avatar" />
      <div style="display: flex; align-items: center; justify-content: center">
        <p style="font-weight: 800; padding-top: 20px">Powered By:</p>
        <img
          src="https://doc-08-c0-docs.googleusercontent.com/docs/securesc/jv2p6ju7h3p4dperf6mt7v1frttk7g3l/3t51j1idm06hgbth33u91n7bgo49m2ti/1601201025000/00918150352500674599/00918150352500674599/1iuGgeVZq2S_MZO7s2i1bXQo4McBu9Q2V?authuser=0"
          alt="Avatar"
          style="width: 300px"
        />
      </div>
    </div>
    `, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
