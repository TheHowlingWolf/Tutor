const ClassO = require("../models/Class");

exports.getClassById = (req, res, next, id) => {
    ClassO.findById(id).exec((err, obj)=>{     
        if(err || !obj)
        {
            return res.status(400).json({
                error: "No such Class exists"
            })
        }
        req.classO = obj;
        next();
    })
}
exports.createClass = (req,res) =>{
    console.log(req)
    const classO = new ClassO(req.body);
    classO.save((err,classO) => {
        if(err || !classO){
            console.log(err)
            return res.status(400).json({
                error: "Please enter all the fields!"
            })
        }
        res.json({classO})
    })    
}

    exports.getAllClasses = (req,res) =>{
        ClassO.find().exec((err,cat)=>{
            if(err || !cat){
                return res.status(400).json({
                    error: "class doesn't exist"
                })
            }
            res.json(cat);
        })
    }

    exports.getAClass = (req,res) =>{
        console.log(req.classO);
        return res.json(req.classO);
    }

    exports.removeClass = (req,res) =>{
        console.log("hi")
        const classO = req.classO;
        console.log(req.classO);
        classO.remove((err,cat)=>{
            if(err){
                return res.status(400).json({
                    error: "Failed to delete class"
                })
            }
            res.json({
                message: cat.subject + " class deleted"
            });
            }
        )
    }
    
    exports.updateClass = (req,res) =>{
    
        const classO = req.classO;
        classO.classLink = req.body.classLink;
        classO.subject = req.body.subject;
        classO.standard = req.body.standard;
        classO.time = req.body.time;
        classO.date = req.body.date;
        classO.save((err,updatedclassO) => {
            if(err || !updatedclassO){
                return res.status(400).json({
                    error: "class not saved" + err
                })
            }
           res.json(updatedclassO)
        })
        
    }