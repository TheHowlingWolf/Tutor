const Standard = require("../models/Standard")

exports.getStandardById = (req, res, next, id) => {
    Standard.findById(id).exec((err, std)=>{     
        if(err || !std)
        {
            return res.status(400).json({
                error: "No such Standard exists"
            })
        }
        req.standard = std;
        next();
    })
}

exports.addStandard = (req, res) => {
    const standard = new Standard(req.body);

    standard.save().then(std => {
        res.json({std})
    }).catch(err => {
        console.log("Error addStandard", err);
        res.status(403).json({
            success: false,
            message: "Cannot Add Standard"
        });
    })
}


exports.getAllStandards = (req, res) => {
    Standard.find().exec((err,std)=>{
        if(err || !std){
            return res.status(400).json({
                error: "Standards doesn't exist"
            })
        }
        res.json(std);
    })
}

exports.getAStandard = (req,res) =>{
    
    return res.json(req.standard);
}

exports.removeStandard = (req,res) =>{
    
    const standard = req.standard;
    
    standard.remove((err,std)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete standard"
            })
        }
        res.json({
            message: std.name + " standard deleted"
        });
        }
    )
}

exports.updateStandard = (req,res) =>{
    
    const standard = req.standard;
    standard.name = req.body.name;
    
    standard.save((err,updatedstandard) => {
        if(err || !updatedstandard){
            return res.status(400).json({
                error: "standard not saved" + err
            })
        }
       res.json(updatedstandard)
    })
    
}