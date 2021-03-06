var express = require('express')
var router = express.Router();

const { isAdmin,isSignedIn,isAuthenticated,isTeacher } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getAllClasses,getClassById,createClass,removeClass,updateClass,getAClass,getUserClass,createClassInSubject } = require("../controllers/class")
const { getSubjectById } = require("../controllers/subject");


//subjectId
router.param("subjectId", getSubjectById); 

// router.param("userId", getUserById);
router.param("classId", getClassById); 
router.param("userId", getUserById); 

//create class
router.post("/class/create",createClass);
router.post("/class/create/:subjectId",createClassInSubject);

//listing
router.get("/classes",getAllClasses);
router.get("/class/:classId",getAClass);

//Classes for students
router.get("/class/user/:userId",getUserClass);

//delete
router.delete("/class/delete/:classId",removeClass);

//update
router.put("/class/update/:classId",updateClass);

module.exports = router;

