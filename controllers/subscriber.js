const Subscriber = require('../models/subscriber');
const nodemailer = require('nodemailer');
exports.createSubscriber = (req, res) => {
  const newSub = new Subscriber(req.body);
  newSub
    .save()
    .then((subs) => {
      
      res.json(subs);
    })
    .catch((err) => {
      console.log(JSON.stringify(err, undefined, 2));
      if (err.errors.email)
        return res
          .status(401)
          .json({ error: 'You are already subscribed to us.' });

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
  try {
    const { subject, bodyMsg } = req.body;
    const subscribers = await Subscriber.find().select('email');
    // Generate test SMTP service account from ethereal.email

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'infinite.loop329@gmail.com', // generated ethereal user
        pass: 'infinite@123!', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Effervescence 👨‍🎓"', // sender address
      to: subscribers.map((subs) => subs.email).join(','), // list of receivers
      subject: `${subject}`, // Subject line
      html: `<div
      style="
      background: #ffffff;
      color: #222326;
      padding: 20px;
      justify-content: center;
      
      "
      >
      
      ${bodyMsg} 
      
      </div>
      `, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: 'Cannot Send mail' });
  }
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
