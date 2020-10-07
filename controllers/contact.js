const Contact = require('../models/Contactus');

exports.addContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

exports.getContact = async (req, res) => {
  try {
    const { pageNo = 1, pageSize = 30 } = req.body;
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};
