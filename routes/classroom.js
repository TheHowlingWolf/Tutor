var express = require('express')
var route = express.Router()

const { isAdmin,isSignedIn,isAuthenticated,isTeacher } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const {getAllClassrooms, getClassroomById, getAClassroom, createClassroom, removeClassroom, updateClassroom, getClasroomPic} = require('../controllers/classroom')
const router = require('./auth')


//get classroomId
router.param("classroomId", getClassroomById);

//create classroom
router.post("/classroom/create", createClassroom);

// find classrooms
router.get("/classrooms", getAllClassrooms);
router.get("/classroom/:clasroomId", getAClassroom);

//delete classroom
router.delete("/classroom/delete/:classroomId", removeClassroom);

//update classroom
router.put("/classroom/update/:classroomId", updateClassroom);

//get classroom image
router.get("/classroom/classroomimge/:classroomId", getClasroomPic);

module.exports = router;