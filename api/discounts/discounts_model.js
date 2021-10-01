const mongoose = require('mongoose');
const Joi 	   = require('joi');

const discountSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	discountAmt		: { type : Number , required : true , unique : true },
	description		: { type : String },
	discountCode  	: { type : String },
	available   	: { type : Boolean },
	availableFrom  	: { type : Date },
	availableTo  	: { type : Date },
	createdAt		: { type : Date , default : Date.now},
	createdBy		: { type : Number },
});

module.exports = mongoose.model('discounts',discountsSchema);
