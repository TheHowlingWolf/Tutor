const Classroom = require('../models/Classroom')
const User = require('../models/user')

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
        res.json(cat)
    })
}

exports.getAClassroom = (req,res) => {
    res.json(req.classroom)
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