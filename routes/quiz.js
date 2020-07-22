const express = require("express");
const router = express.Router();

const { getQuizById, createQuiz, createQuestion, getQuestionById, getQuiz, createOption, getQuizByTeacher } = require("../controllers/quiz")
const { getUserById } = require("../controllers/user")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { addSubject } = require("../controllers/subject");

router.post("/subject/create",addSubject);
//Setting User to Request
router.param("quizId", getQuizById);
router.param("quesId", getQuestionById);
router.param("userId", getUserById);


//Operations
router.post("/quiz/create", createQuiz);

router.post("/quiz/question/create/:quizId", createQuestion);

router.post("/quiz/question/options/create/:quizId/:quesId", createOption);

router.get("/quiz/:quizId", getQuiz);

router.get("/quizzes/:userId", getQuizByTeacher);


module.exports = router;