var express = require('express')
var router = express.Router();

const { uploadDocument} = require("../controllers/document")

router.post("/document/upload", uploadDocument)

module.exports = router;