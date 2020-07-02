const express = require("express");
const router = express.Router();

const { getQuizById, createQuiz, createQuestion, getQuestionById, getQuiz, createOption } = require("../controllers/quiz")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { addSubject } = require("../controllers/subject");

router.post("/subject/create",addSubject);
//Setting User to Request
router.param("quizId", getQuizById);
router.param("quesId", getQuestionById);


//Operations
router.post("/quiz/create", createQuiz);

router.post("/quiz/question/create/:quizId", createQuestion);

router.post("/quiz/question/options/create/:quizId/:quesId", createOption);

router.get("/quiz/:quizId", getQuiz);


module.exports = router;