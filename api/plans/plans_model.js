const mongoose = require('mongoose');
const Joi 	   = require('joi');

const plansSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	plan 			: { type : String , required : true , unique : true },
	description 	: { type : String },
	availableFrom	: { type : Date },
	availableTo		: { type : Date },
	discoutAmt  	: { type : Number },
	createdAt		: { type : Date , default : Date.now},
	createdBy		: { type : Number },
});

module.exports = mongoose.model('plans',plansSchema);
