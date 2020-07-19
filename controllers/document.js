const DocumentO = require("../models/Document");
const fs = require('fs');
const path = require('path');

exports.getDocumentById = (req, res, next, id) => {
    DocumentO.findById(id).exec((err, obj)=>{     
        if(err || !obj)
        {
            return res.status(400).json({
                error: "No such Document exists"
            })
        }
        req.DocumentO = obj;
        next();
    })
}

exports.uploadDocument = (req,res) =>{
    var documentO = new DocumentO;
    console.log("Upload doc",req.body)

    if(req.body.files){
        console.log(req.files.file.name)
        var doc = req.files.file, 
        docname = doc.name;
        doc.mv(__dirname+"/upload/"+docname, (err, result) => {
            if(err)
            throw err;
            documentO.teacher_file = fs.readFileSync(path.join(__dirname+'/upload/'+docname))
            documentO.name = docname;
            documentO.save((err,documentO) => {
                if(err || !documentO){
                    console.log(err)
                    return res.status(400).json({
                        error: "Please enter all the fields!"
                    })
                }
                res.json({documentO})
            })
        })
    }
}