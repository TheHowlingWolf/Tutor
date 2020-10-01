const express = require('express');
const router = express.Router();

const {
  getUserById,
  getOneUser,
  getAllUsers,
  photoUser,
  updatedUser,
  addSubjects,
  studentClassrooms,
  studentClasses,
  getUserByEmailandUpdate,
  buySubjects,
  getResponsebyUser,
  searchUser,
  getExpiredUsers
} = require('../controllers/user');

const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');

//Setting User to Request
router.param('userId', getUserById);

//Operations

//Getting One User
router.get('/user/:userId', isSignedIn, getOneUser);

//Updating user
router.put('/update/:userId', isSignedIn, updatedUser);

//Change role
router.put('/update/role/:userId', getUserByEmailandUpdate);

//
router.get('/user/response/:userId', getResponsebyUser);

//Getting All User
router.get('/users', getAllUsers);

//Expired users
router.get('/expired/users', getExpiredUsers);

//Getting User photo
router.get('/user/userPhoto/:userId', photoUser);

//Adding/Enrolling Subject
router.put('/user/addSubject', addSubjects);
router.put('/user/buySubject', buySubjects);

//getting classrooms of the subscribed subjects
router.post('/user/subclassrooms', studentClassrooms);

//getting classes of the subscribed subjects
router.post('/user/subclasses', studentClasses);
router.post('/user/search', searchUser);

module.exports = router;
