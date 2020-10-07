const express = require("express");
const router = express.Router();

const { getQuizById, createQuiz, createQuestion, getQuestionById,updateQuiz,getOptionById,getAOption, studentQuizes, getQuizQuestions,deleteQuiz,updateOption, createOption,deleteOption, getQuizByTeacher, getAQuiz,deleteQuestion ,updateQuestion, getAQuestion,img,createResponse,publishQuiz } = require("../controllers/quiz")
const { getUserById } = require("../controllers/user")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { addSubject, getSubjectById } = require("../controllers/subject");

router.post("/subject/create",addSubject);
//Setting User to Request
router.param("quizId", getQuizById);
router.param("quesId", getQuestionById);
router.param("optionId", getOptionById);
router.param("userId", getUserById);
router.param("subjectId", getSubjectById);


//Operations
router.post("/quiz/create/:subjectId", createQuiz);

//Publish
router.post("/quiz/publish/:subjectId/:quizId", publishQuiz);

router.put("/quiz/update/:quizId", updateQuiz);

router.delete("/quiz/delete/:quizId", deleteQuiz);
router.post("/response/create/:quizId/:userId", createResponse);

router.post("/question/create/quiz/:quizId", createQuestion);

router.post("/options/create/:quesId", createOption);

router.delete("/question/delete/quiz/:quizId/:quesId", deleteQuestion);
router.delete("/option/delete/:quesId/:optionId", deleteOption);

router.put("/question/update/:quesId", updateQuestion);
router.put("/option/update/:optionId", updateOption);

// router.get("/allquestions/:quizId", getQuiz);
router.get("/question/img/:quesId",img) 

router.get("/allquiz/quiz/:quizId", getAQuiz);
router.get("/allquiz/responses/:quizId", getAQuiz);

router.get("/allquiz/start/quiz/:quizId", getAQuiz);

router.get("/quiz/:quizId", getAQuiz);

router.get("/question/:quesId", getAQuestion);
router.get("/option/:optionId", getAOption);

router.get("/quizzes/:userId", getQuizQuestions);

//Quiz for each student
router.get("/user/subquizes/:userId", studentQuizes);


module.exports = router;