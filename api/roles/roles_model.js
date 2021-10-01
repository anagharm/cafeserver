const mongoose = require('mongoose');
const Joi 	   = require('joi');

const roleSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	role		: { type : String , required : true , unique : true },
	description	: { type : String },
	createdAt	: { type : Date , default : Date.now},
	createdBy	: { type : Number },
});

module.exports = mongoose.model('roles',roleSchema);
