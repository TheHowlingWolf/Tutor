var express = require('express')
var router = express.Router();

const { uploadDocument, uploadDocument2} = require("../controllers/document")

router.post("/document/upload", uploadDocument)
router.post("/document/upload2", uploadDocument2)

module.exports = router;