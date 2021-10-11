const express 	= require("express");
const router 	= express.Router();
const MenuController = require('./menus_controllers');

router.post('/post/addmenu', MenuController.addmenu); 
router.patch('/patch/menu', MenuController.patchmenu); 
router.get('/get/list', MenuController.listmenu); 
router.get('/get/list/keyvalue', MenuController.listmenukeyvalue); 
router.get('/get/menudetails/:id', MenuController.menudetails); 
router.delete('/delete/menu', MenuController.deletemenu); 

module.exports = router;