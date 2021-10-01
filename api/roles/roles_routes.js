const express 	= require("express");
const router 	= express.Router();
const RoleController = require('./roles_controllers');

router.post('/post/addrole', RoleController.addrole); 
router.patch('/patch/role', RoleController.patchrole); 
router.get('/get/list', RoleController.listrole); 
router.get('/get/roledetails', RoleController.roledetails); 
router.delete('/delete/role', RoleController.deleterole); 

module.exports = router;