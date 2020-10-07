var express = require('express');
var router = express.Router();

const { addContact, getContact } = require('../controllers/contact');

router.get('/contactus/get', getContact);
router.post('/contactus/add', addContact);

module.exports = router;
