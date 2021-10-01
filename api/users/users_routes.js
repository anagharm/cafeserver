const express 	= require("express");
const router 	= express.Router();
const UserController = require('./users_controllers');

router.post('/post/signup', UserController.signup); 
router.post('/post/signin', UserController.signin); 
// router.post('/post/createuser', UserController.createuser); 

module.exports = router;