const express = require("express");
const router = express.Router();

const { getQuizById, createQuiz, createQuestion, getQuestionById, getQuiz, createOption, getQuizByTeacher, getAQuiz,deleteQuestion } = require("../controllers/quiz")
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

router.post("/question/create/quiz/:quizId", createQuestion);

router.post("/options/create/:quesId", createOption);

router.delete("/questions/delete/quiz/:quizId/:quesId", deleteQuestion);

router.get("/allquestions/:quizId", getQuiz);

router.get("/allquiz/quiz/:quizId", getQuiz);

router.get("/quiz/:quizId", getAQuiz);

router.get("/quizzes/:userId", getQuizByTeacher);


module.exports = router;