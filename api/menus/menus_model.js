const mongoose = require('mongoose');
const Joi 	   = require('joi');

const menuSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	menu		: { type : String , required : true , unique : true },
	description	: { type : String },
	price  		: { type : Number },
	available   : { type : Boolean },
	createdAt	: { type : Date , default : Date.now},
	createdBy	: { type : Number },
});

module.exports = mongoose.model('menus',menuSchema);
