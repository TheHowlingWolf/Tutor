var express = require('express')
var route = express.Router()

const { isAdmin,isSignedIn,isAuthenticated,isTeacher } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const {uploadDocument2,getAllClassrooms,getDocumentById,getAnswerById,getAssignmentById, getClassroomById, getAClassroom, createClassroom, removeClassroom, updateClassroom, getClasroomPic, addMembers, uploadAssignment, uploadAnswer, getAllMembers} = require('../controllers/classroom')
const router = require('./auth')


//get classroomId
router.param("classroomId", getClassroomById);
router.param("documentId", getDocumentById);
router.param("assignmentId", getAssignmentById);
router.param("answerId", getAnswerById);

//create classroom
router.post("/classroom/create", createClassroom);

//add members
router.post("/classroom/addmembers/:classroomId", addMembers);

// find classrooms
router.get("/classrooms", getAllClassrooms);
router.get("/classroom/:classroomId", getAClassroom);

//delete classroom
router.delete("/classroom/delete/:classroomId", removeClassroom);

//update classroom
router.put("/classroom/update/:classroomId", updateClassroom);

//get classroom image
router.get("/classroom/classroomimg/:classroomId", getClasroomPic);

//upload notes
router.put("/classroom/:classroomId/upload/document", uploadDocument2)

//upload assignment
router.put("/classroom/:classroomId/upload/assignment", uploadAssignment)

//upload answer
router.put("/classroom/:classroomId/upload/answer", uploadAnswer)

//get classroom users
router.get('/classroom/:classroomId/members', getAllMembers)

module.exports = router;