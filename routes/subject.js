var express = require('express')
var router = express.Router();

const { isAdmin,isSignedIn,isAuthenticated,isTeacher } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getSubjectById, addSubject, removeSubject, getASubject, getAllSubjects, updateSubject } = require("../controllers/subject");



//subjectId
router.param("subjectId", getSubjectById); 

//create subject
router.post("/subject/create",addSubject);

//listing
router.get("/subjects",getAllSubjects);
router.get("/subject/:subjectId",getASubject);

//delete
router.delete("/subject/delete/:subjectId",removeSubject);

//update
router.put("/subject/update/:subjectId",updateSubject);

module.exports = router;

