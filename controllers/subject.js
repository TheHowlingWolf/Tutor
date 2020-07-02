const Subject = require("../models/Subject")




exports.addSubject = (req, res) => {
    const subject = new Subject({
        name: req.body.name
    });

    subject.save().then(sub => {
        res.json({
            success: true,
            data: sub
        })
    }).catch(err => {
        console.log("Error addSubject", err);
        res.status(403).json({
            success: false,
            message: "Cannot Add Subject"
        });
    })
}


exports.getAllSubjects = (req, res) => {
    Subject.find().then(sub => {
        res.json({
            success: true,
            data: sub
        })
    }).catch(err => {
        console.log("Error getAllSubjects", err);
        res.status(403).json({
            success: false,
            message: "Cannot Add Subject"
        });
    })
}