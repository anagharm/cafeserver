const express 	= require("express");
const router 	= express.Router();
const ProfileController = require('./profiles_controllers');

router.get('/get/list', ProfileController.listuser); 
router.get('/get/userdetails/:id', ProfileController.userdetails); 
router.patch('/patch/userdetails', ProfileController.patchuserdetails); 

module.exports = router;