const Quiz = require("../models/Quiz");
const QuizQuestions = require("../models/QuizQuestions");
const Response = require("../models/Responses");
const UserO = require('../models/user');
const formidable = require('formidable');
const AnswerOptions = require("../models/AnswerOptions");
const fs = require('fs');

exports.getQuizById = (req, res, next, quizid) => {
    Quiz.findById(quizid).then(quiz => {
        req.quiz = quiz;
        next();
    }).catch(err => {
        return res.status(403).json({
            error: "Error Finding the quiz"+err
        })
    })
}

exports.getAQuiz = (req, res) => {
    Quiz.find({
        _id: req.quiz._id
    }).select("-img").populate({
        path: 'questions', select: "-img", populate: {
            path: "options",
            model: "AnswerOption"
        }
    }).then(quiz => {
        res.status(200).json({ data: quiz })
    })
    // return res.status(200).json(req.quiz);
  };
  exports.deleteQuiz = (req, res) => {
    
    const quiz = req.quiz;
    quiz.remove((err,sub)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete quiz"
            })
        }
        res.json({
            message: sub.name + " quiz deleted"
        });
        }
    )
  };

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

exports.getOptionById = (req, res, next, optionId) => {
    AnswerOptions.findById(optionId).then(option => {
        req.option = option;
        next();
    }).catch(err => {
        return res.status(403).json({
            error: "Error Finding the option"+err
        })
    })
}

exports.getAQuestion = (req, res) =>{
    return res.status(200).json(req.question);
}

exports.getAOption = (req, res) =>{
    return res.status(200).json(req.option);
}

exports.createQuiz = (req, res) => {
    const quiz = new Quiz({
        title: req.body.title,
        subject: req.body.subject,
        standard: req.body.standard,
        endTime: req.body.endTime,
        start: req.body.start,
        teacher: req.body.teacher,
        duration: req.body.mm
    });

    quiz.save().then(quiz => {
        res.status(200).json({
            data: quiz
        });
    });
}

exports.updateQuiz = (req, res) => {
    const quiz = req.quiz

        quiz.title= req.body.title,
        quiz.subject= req.body.subject,
        quiz.standard= req.body.standard,
        quiz.endTime= req.body.endTime,
        quiz.start= req.body.start,
        quiz.teacher= req.body.teacher,
        quiz.duration= req.body.mm

    quiz.save().then(quiz => {
        res.status(200).json({
            data: quiz
        });
    });
}

exports.createResponse = (req, res) => {
    let option = [];
    req.body.cSelected.forEach(resp => {
        option.push(resp)
    });
    const response = new Response({
        response: option,
        quizId: req.body.quiz._id,
        student: req.body.user._id,
        totalMarks: req.body.totalMarks
    });

    response.save().then(quiz => {
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
        const { title, numCorrect,hasImg } = fields;
        
        if (!title && !file.img) {
            return res.status(400).json({
                error: "Cannot Save Question"
            });
        }

        let question = new QuizQuestions({
            title: title,hasImg:hasImg,numCorrect
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
                        res.status(500).json({ error: "Cannot add question please refresh and try again."+err });
                    }).catch(err => {
                        console.log(" Question Delete", err);
                        res.status(500).json({ error: "Cannot add question please refresh and try again."+err });
                    })
                })

        }).catch(err => {
            // question.save Catch Block
            console.log(" Question save", err);
            res.status(403).json({ error: "Cannot Save Question" });
        });
    });

}

exports.updateQuestion = (req, res) => {
    console.log("^^",req.question)
    // for (var key of req.body.entries()) {
    //     console.log(key[0] + ', ' + key[1])
    // }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
    

        if (err) {
            return res.status(400).json({
                error: "Cannot Save Question"
            });
        }
        const { title, numCorrect, } = fields;
        

        let question = req.question
        question.title = title

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
            
            console.log(" Question updated");
            return res.json(ques)
        }).catch(err => {
            // question.save Catch Block
            console.log(" Question save", err);
            res.status(403).json({ error: "Cannot Save Question" });
        });
    });

}

exports.deleteQuestion = (req,res) =>{
    Quiz.updateOne(
        { _id: req.quiz._id },
        { $pull: { questions: { $in: [ req.question._id ] } } },
        (err,ques)=>{
        if(err || !ques){
            return res.status(400).json({
                error: "Question not deleted"
            })
        }
        res.json(ques);
    });
}

exports.deleteOption = (req,res) =>{
    console.log("kkkkkkkkkkkk")
    QuizQuestions.updateOne(
        { _id: req.question._id },
        { $pull: { options: { $in: [ req.option._id ] } } },
        (err,ques)=>{
        if(err || !ques){
            return res.status(400).json({
                error: "Option not deleted"
            })
        }
        res.json(ques);
    });
}


exports.createOption = (req, res) => {

    const option = new AnswerOptions({
        optionValue: req.body.optionValue,
        isCorrect: req.body.isCorrect ? true : false
    });
    option.save().then(async option => {
        const pushed = await Promise.resolve(req.question.options.push(option._id));
        console.log(req.question)
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

exports.updateOption = (req, res) => {
    
    const option = req.option
        option.optionValue= req.body.optionValue,
        option.isCorrect= req.body.isCorrect ? true : false
   
    option.save().then(option => {
        res.json(option)
    })
}

exports.img = (req,res,next) => {
    
    if(req.question.img.data){
        res.set("Content-Type",req.question.img.contentType)
        return res.send(req.question.img.data);
    }
    next();
};

exports.getQuizQuestions = (req, res) => {
    
    Quiz.find().select("-img").populate({
        path: 'questions', select: "-img", populate: {
            path: "options",
            model: "AnswerOption"
        }
    }).then(quiz => {
        res.status(200).json({ data: quiz })
    })
}

exports.getQuizByTeacher = (req, res) => {
    Quiz.find({
        teacher: req.user._id
    }).exec().then(quiz => {
        res.status(200).json(quiz)
    })
}


exports.studentQuizes = (req,res) => {
    const subquiz = []
    // console.log(req.body)
    UserO.findById(req.body.user_id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No User is found in Database",
        });
      }
      const userO = user;
  
      Quiz.find().select("-img").populate({
        path: 'questions', select: "-img", populate: {
            path: "options",
            model: "AnswerOption"
        }
    }).then(quizes => {
      if(err || !quizes){
          return res.status(400).json({
              error: "Classes Do Not Exist"
          })
          
      }
      quizes.map((obj, i) => {
        userO.subject.map((o,i)=>{
          if(o.name === undefined){o.name = "wrong"}
          if((obj.subject.toString() === o.name.toString())&&((parseInt(o.value) !== 0))
          &&(userO.standard.toString() === obj.standard.toString())
          ){
            subquiz.unshift(obj)
          }
        })
      })
      res.json(subquiz);
  })
  }
  )
  
  }
  