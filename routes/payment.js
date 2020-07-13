var express = require('express')
var router = express.Router();

const { paymentProcess,paymentVerification } = require("../controllers/payment")


router.post('/payment',paymentProcess)
router.post('/verification',paymentVerification)

module.exports = router;

