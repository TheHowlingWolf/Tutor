var express = require('express')
var router = express.Router();

const { isAdmin,isSignedIn,isAuthenticated,isTeacher } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getAllClasses,getClassById,createClass,removeClass,updateClass,getAClass } = require("../controllers/class")


// router.param("userId", getUserById);
router.param("classId", getClassById); 

//create class
router.post("/class/create",createClass);

//listing
router.get("/classes",getAllClasses);
router.get("/class/:classId",getAClass);

//delete
router.delete("/class/delete/:classId",removeClass);

//update
router.put("/class/update/:classId",updateClass);

module.exports = router;

