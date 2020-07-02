const Quiz = require("../models/Quiz");
const QuizQuestions = require("../models/QuizQuestions");
const formidable = require('formidable');
const AnswerOptions = require("../models/AnswerOptions");
const fs = require('fs');

exports.getQuizById = (req, res, next, quizid) => {
    Quiz.findById(quizid).then(quiz => {
        req.quiz = quiz;
        next();
    }).catch(err => {
        return res.status(403).json({
            error: "Error Finding the quiz"
        })
    })
}

exports.getQuestionById = (req, res, next, quesId) => {
    QuizQuestions.findById(quesId).then(question => {
        req.question = question;
        next();
    }).catch(err => {
        return res.status(403).json({
            error: "Error Finding the question"
        })
    })
}

exports.createQuiz = (req, res) => {
    const quiz = new Quiz({
        title: req.body.title,
        subject: req.body.subject,
        time: req.body.time
    });

    quiz.save().then(quiz => {
        res.status(200).json({

            data: quiz
        });
    });
}

exports.createQuestion = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Cannot Save Question"
            });
        }
        const { title, numCorrect, } = fields;
        
        if (!title) {
            return res.status(400).json({
                error: "Cannot Save Question"
            });
        }

        let question = new QuizQuestions({
            title: title,numCorrect
        })
        

        if (file.img) {
            if (file.img.size > 2097152) //1048576 = 2*1024*1024 i.e 1mb limit
            {
                return res.status(413).json({
                    error: "File size too big"
                });
            }

            else {

                question.img.data = fs.readFileSync(file.img.path);
                question.img.contentType = file.img.type;
            }
        }
   
        //Save to db
        question.save().then(async ques => {
            //Push the question the the quiz list using promise to synchronise it
            const pushed = await Promise.resolve(req.quiz.questions.push(ques._id));
            
            ques.img=undefined
            req.quiz.save()
                .then(updatedQuiz => {
                    res.status(200).json({
                        data: ques
                    });
                }).catch(err => {

                    console.log("Quiz Update", err);
                    QuizQuestions.findByIdAndDelete(ques._id).then(data => {
                        res.status(500).json({ error: "Cannot add question please refresh and try again." });
                    }).catch(err => {
                        console.log(" Question Delete", err);
                        res.status(500).json({ error: "Cannot add question please refresh and try again." });
                    })
                })

        }).catch(err => {
            // question.save Catch Block
            console.log(" Question save", err);
            res.status(403).json({ error: "Cannot Save Question" });
        });
    });

}

exports.createOption = (req, res) => {
    const option = new AnswerOptions({
        optionValue: req.body.optionValue,
        isCorrect: req.body.isCorrect ? true : false
    });

    option.save().then(async option => {
        const pushed = await Promise.resolve(req.question.options.push(option._id));
        req.question.save().then(updatedQues => {
            res.status(200).json({ data: option });
        }).catch(err => {
            console.log("Question update", err);
            AnswerOptions.findByIdAndDelete(option._id).then(data => {
                res.status(403).json({ error: "Cannot Add Option" })
            }).catch(err => {
                console.log("Option Delete", err);

            })
        })
    })
}

exports.getQuiz = (req, res) => {
    Quiz.find().populate({
        path: 'questions', select: "-img", populate: {
            path: "options",
            model: "AnswerOption"
        }
    }).then(quiz => {
        res.status(200).json({ data: quiz })
    })
}

