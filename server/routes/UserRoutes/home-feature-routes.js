const express = require("express");
const router = express.Router();
const userhome = require("../../controller/User/home-features-controller");




// search 
router.post("/search",userhome.SearchUser)

// find user details 
router.get("/find-user",userhome.findUserDetails)

//home 
router.post("/",userhome.Home)


module.exports = router;