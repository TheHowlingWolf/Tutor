const express = require("express");
const router = express.Router();

const {
  getUserById,
  getOneUser,
  getAllUsers,
  photoUser,
  updatedUser,
  addSubjects,
  studentClassrooms,
  studentClasses
} = require("../controllers/user");

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

//Setting User to Request
router.param("userId", getUserById);

//Operations

//Getting One User
router.get("/user/:userId", isSignedIn, getOneUser);

//Updating user
router.put("/update/:userId", isSignedIn, updatedUser);

//Getting All User
router.get("/users", getAllUsers);

//Getting User photo
router.get("/user/userPhoto/:userId", photoUser);

//Adding/Enrolling Subject
router.put("/user/addSubject", addSubjects);

//getting classrooms of the subscribed subjects
router.post("/user/subclassrooms", studentClassrooms);

//getting classrooms of the subscribed subjects
router.post("/user/subclasses", studentClasses);

module.exports = router;