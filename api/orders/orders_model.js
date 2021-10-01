const mongoose = require('mongoose');
const Joi 	   = require('joi');

const orderSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	orderNum		: { type : Number , required : true , unique : true },
	orderDate		: { type : Date },
	orderedMenu  	: [{ 
							menu_Id 	: { type : Number },
							menu 		: { type : String },
							price 		: { type : Number }

					  }],
	totalAmount   	: { type : Number },
	discoutAmt  	: { type : Number },
	discountId  	: { type : ObjectId },
	plan   			: { type : String },
	planId 			: { type : ObjectId },
	customerName  	: { type : String },
	customerMobNum 	: { type : String },
	createdAt		: { type : Date , default : Date.now},
	createdBy		: { type : Number },
});

module.exports = mongoose.model('orders',ordersSchema);
