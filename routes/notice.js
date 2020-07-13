var express = require('express')
var router = express.Router();

const { isAdmin,isSignedIn,isAuthenticated,isTeacher } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getAllNotices,getNoticeById,createNotice,removeNotice,updateNotice,getANotice } = require("../controllers/notice")


// router.param("userId", getUserById);
router.param("noticeId", getNoticeById); 

//create notice
router.post("/notice/create",createNotice);

//listing
router.get("/notices",getAllNotices);
router.get("/notice/:noticeId",getANotice);

//delete
router.delete("/notice/delete/:noticeId",removeNotice);

//update
router.put("/notice/update/:noticeId",updateNotice);

module.exports = router;

