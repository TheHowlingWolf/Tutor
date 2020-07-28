const express = require("express");
const router = express.Router();

const { getQuizById, createQuiz, createQuestion, getQuestionById,updateQuiz,getOptionById, getQuizQuestions,deleteQuiz,updateOption, createOption,deleteOption, getQuizByTeacher, getAQuiz,deleteQuestion ,updateQuestion, getAQuestion,img,createResponse } = require("../controllers/quiz")
const { getUserById } = require("../controllers/user")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { addSubject } = require("../controllers/subject");

router.post("/subject/create",addSubject);
//Setting User to Request
router.param("quizId", getQuizById);
router.param("quesId", getQuestionById);
router.param("optionId", getOptionById);
router.param("userId", getUserById);


//Operations
router.post("/quiz/create", createQuiz);

router.put("/quiz/update/:quizId", updateQuiz);

router.delete("/quiz/delete/:quizId", deleteQuiz);
router.post("/response/create", createResponse);

router.post("/question/create/quiz/:quizId", createQuestion);

router.post("/options/create/:quesId", createOption);

router.delete("/option/delete/quiz/:quizId/:quesId", deleteQuestion);
router.delete("/option/delete/quiz/:quesId/:optionId", deleteOption);

router.put("/questions/update/:quesId", updateQuestion);
router.put("/questions/update/:optionId", updateQuestion);

// router.get("/allquestions/:quizId", getQuiz);
router.get("/question/img/:quesId",img) 

router.get("/allquiz/quiz/:quizId", getAQuiz);

router.get("/allquiz/start/quiz/:quizId", getAQuiz);

router.get("/quiz/:quizId", getAQuiz);

router.get("/question/:quesId", getAQuestion);

router.get("/quizzes/:userId", getQuizQuestions);


module.exports = router;