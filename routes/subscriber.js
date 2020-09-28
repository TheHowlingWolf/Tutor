const express = require('express');
const router = express.Router();
const {
  createSubscriber,
  sendAllNewsLetter,
} = require('../controllers/subscriber');
router.post('/add/subscriber', createSubscriber);
router.post('/push/emails', sendAllNewsLetter);
module.exports = router;
