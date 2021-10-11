const express 	= require("express");
const router 	= express.Router();
const RoleController = require('./roles_controllers');

router.post('/post/addrole', RoleController.addrole); 
router.patch('/patch/role', RoleController.patchrole); 
router.get('/get/list', RoleController.listrole); 
router.get('/get/list/keyvalue', RoleController.listrolekeyvalue); 
router.get('/get/roledetails/:id', RoleController.roledetails); 
router.delete('/delete/role', RoleController.deleterole); 

module.exports = router;