var express = require('express')
var router = express.Router();

const { isAdmin,isSignedIn,isAuthenticated,isTeacher } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getStandardById, addStandard, removeStandard, getAStandard, getAllStandards, updateStandard } = require("../controllers/standard");



//StandardId
router.param("standardId", getStandardById); 

//create Standard
router.post("/standard/create",addStandard);

//listing
router.get("/standards",getAllStandards);
router.get("/standard/:standardId",getAStandard);

//delete
router.delete("/standard/delete/:standardId",removeStandard);

//update
router.put("/standard/update/:standardId",updateStandard);

module.exports = router;

