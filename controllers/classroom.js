const Classroom = require('../models/Classroom')
const DocumentO = require('../models/Document');
const AssignmentO = require('../models/Assignment');
const AnswerO = require('../models/AssignmentAnswers')
const User = require('../models/user')
const path = require('path');
const formidable = require('formidable')
const _ = require("lodash") //we use _ when we need to declare a private variable but not going to use too much of it
const fs = require("fs")  //present by default in node no need to install


exports.getClassroomById = (req, res, next, id) => {
    Classroom.findById(id).exec((err, obj) => {
        if(err || !obj){
            return res.status(400).json({
                error: "No such Class Room exits"
            })
        }
        req.Classroom = obj;
        next();
    })
}
exports.createClassroom = (req, res) => {
    const classroom = new Classroom(req.body);
    
    // User.findById(req.user.id)
    // .then(user => {
    //     classroom.owner = user;
    // })
    // .catch(err => console.log("error while adding owner " + err))
    classroom.save((err, classroom) => {
        if(err || !classroom){
            return res.status(400).json({
                error: "Please Enter All The Fields"
            })
        }
        res.json({classroom})
    })
}

exports.getAllClassrooms = (req, res) => {
    Classroom.find().exec((err, cat) => {
        if(err || !cat){
            return res.status(400).json({
                error: "Classrooms Do Not Exist"
            })
        }
        console.log(cat)
        res.json(cat)
    })
}

exports.getAClassroom = (req,res) => {
    const classroom= req.Classroom;
    console.log(classroom)
    res.json(classroom)
}

exports.removeClassroom = (req,res) => {
    const classroom = req.Classroom;
    console.log(classroom);
    classroom.remove((err, obj) => {
        if(err || !obj){
            return res.status(400).json({
                error: "Failed to Delete Class Room"
            })
        }
        res.json({
            message: obj.name + " classroom deleted"
        })
    })
}

exports.updateClassroom = (req, res) => {
        const classroom = req.Classroom;
        console.log(classroom)
        classroom.name = req.body.name;
        classroom.description = req.body.description;
        classroom.subject = req.body.subject;
         classroom.save((err, updatedClassroom) => {
             if(err || !updatedClassroom){
                 return res.status(400).json({
                     error: "Classroom not saved on update " + err
                 })
             }
             res.json(updatedClassroom)
         })
}

exports.getClasroomPic = (req, res, next) => {
    if (req.Classroom.image) {
      res.set("Content-Type", req.doc.image.contentType);
      return res.send(req.doc.image.data);
    }
    next();
  };

  exports.addMembers = (req,res) => {
    const classroom = req.Classroom;
      User.findById(req.body.id)
      .then(user => {
        if (
            classroom.members.filter(
              members => members.id.toString() === req.body.id.toString()
            ).length > 0
          ) {
            return res.status(400).json({ error: "Member already exists" });
          }
            classroom.members.unshift(user);
        console.log(user)
            classroom
              .save()
              .then(classroom => res.json(classroom))
              .catch(err => console.log(err));
      })
      .catch(err => console.log(err))
  };

  exports.uploadDocument2 = (req,res) =>{
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,files)=>{
        console.log("---")
        if(err){
            return res.status(400).json({
                error:  "Document has a problem"
            })
        }
        //destructure the field
        const {photo} = fields; //basically price=fields.price is executing here.
    console.log(fields,"f")

    //     if(
    //         (!photos || !student_files) ||
    //         !name ||
    //         !date 
    //     ){
            
    //             return res.status(400).json({
    //                 error: "Fields are missing"
    //             }) 
        
    // }

        //handle files here 
        let product = new DocumentO(fields);
        const classroom = req.Classroom;
        if(files.photo){
        if(files.photo.size >30000000 ) //30mb
        {
            return res.status(400).json({
                error: "Files size exceeded"
            })
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
        product.name = fields.name;
        product.date = Date.now();
        product.uploader = fields.username;
    }
    product.save((err,product) => {
        if(err){
            return res.status(400).json({
                error: err + "Document not saved"
            })
        }
        classroom.doc.unshift(product);
            classroom
              .save()
              .then(classroom => res.json(classroom))
              .catch(err => console.log(err));
    })
    });
}


// upload Assignment

exports.uploadAssignment = (req,res) =>{
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,files)=>{
        console.log("---")
        if(err){
            return res.status(400).json({
                error:  "Document has a problem"
            })
        }
        //destructure the field
        const {photo} = fields; //basically price=fields.price is executing here.
    console.log(fields,"f")
        //handle files here 
        let product = new AssignmentO(fields);
        const classroom = req.Classroom;
        if(files.photo){
        if(files.photo.size >30000000 ) //30mb
        {
            return res.status(400).json({
                error: "Files size exceeded"
            })
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
        product.name = fields.name;
        product.date = Date.now();
        product.uploader = fields.username;
    }
    product.save((err,product) => {
        if(err){
            return res.status(400).json({
                error: err + "Assignment not saved"
            })
        }
        classroom.assignment.unshift(product);
            classroom
              .save()
              .then(classroom => res.json(classroom))
              .catch(err => console.log(err));
    })
    });
}

//upload Answers
// upload Assignment

exports.uploadAnswer = (req,res) =>{
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,files)=>{
        console.log("---")
        if(err){
            return res.status(400).json({
                error:  "Document has a problem"
            })
        }
        //destructure the field
        const {photo} = fields; //basically price=fields.price is executing here.
    console.log(fields,"f")
        //handle files here 
        let product = new AnswerO(fields);
        const classroom = req.Classroom;
        if(files.photo){
        if(files.photo.size >30000000 ) //30mb
        {
            return res.status(400).json({
                error: "Files size exceeded"
            })
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
        product.name = fields.name;
        product.date = Date.now();
        product.uploader = fields.username;
        product.qid = fields.assignment;
    }
    product.save((err,product) => {
        if(err){
            return res.status(400).json({
                error: err + "Assignment not saved"
            })
        }
        classroom.assignmentanswers.unshift(product);
            classroom
              .save()
              .then(classroom => res.json(classroom))
              .catch(err => console.log(err));
    })
    });
}

