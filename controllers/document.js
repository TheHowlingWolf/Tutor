const DocumentO = require("../models/Document");
const path = require('path');
const formidable = require('formidable')
const _ = require("lodash") //we use _ when we need to declare a private variable but not going to use too much of it
const fs = require("fs")  //present by default in node no need to install

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

    if(req.body.filess){
        console.log(req.filess.files.name)
        var doc = req.filess.files, 
        docname = doc.name;
        doc.mv(__dirname+"/upload/"+docname, (err, result) => {
            if(err)
            throw err;
            documentO.photos = fs.readFilesSync(path.join(__dirname+'/upload/'+docname))
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
        console.log(product)
        if(files.photo){
        if(files.photo.size >30000000 ) //30mb
        {
            return res.status(400).json({
                error: "Files size exceeded"
            })
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
    }

    product.save((err,produc) => {
        if(err){
            return res.status(400).json({
                error: err + "Document not saved"
            })
        }
        res.json({produc})
    })
    });
}