const express 	= require("express");
const router 	= express.Router();
const DiscountController = require('./discounts_controllers');

router.post('/post/adddiscount', DiscountController.adddiscount); 
router.patch('/patch/discount', DiscountController.patchdiscount); 
router.get('/get/list', DiscountController.listdiscount); 
router.get('/get/list/keyvalue', DiscountController.listdiscountkeyvalue); 
router.get('/get/discountdetails/:id', DiscountController.discountdetails); 
router.delete('/delete/discount', DiscountController.deletediscount); 

module.exports = router;