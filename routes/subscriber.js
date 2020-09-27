const express = require('express');
const router = express.Router();
const { createSubscriber } = require('../controllers/subscriber');
router.post('/add/subscriber', createSubscriber);
module.exports = router;
