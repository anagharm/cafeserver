const mongoose = require('mongoose');
const Joi 	   = require('joi');

const discountSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	menu 			: { type : String },
	menuId 			: { type : mongoose.Schema.Types.ObjectId },
	typeofDiscount 	: { type : String },
	discountAmt		: { type : Number , required : true },
	description		: { type : String },
	discountCode  	: { type : String },
	available   	: { type : Boolean },
	discountFrom  	: { type : Date },
	discountTo  	: { type : Date },
	createdAt		: { type : Date , default : Date.now},
	createdBy		: { type : Number },
});

module.exports = mongoose.model('discounts',discountSchema);
