const mongoose = require('mongoose');
const Joi 	   = require('joi');

const userSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	password 	: { type : String },
	userName	: { type : String , required : true , unique : true , maxlength : 10 },
	emails		: { type : String , required : true , unique : true},
	verified	: { type : Boolean },
	role 		: { type : String },
	roleId 		: { type : mongoose.Schema.Types.ObjectId },
	otp 		: { type : Number },
	password 	:{
					bcrypt:String
				  },
	loginTokens : [
					{
						when : Date,
						hashedToken : String
					}
				],
	createdAt	: { type : Date , default : Date.now},
	createdBy	: { type : Number },
});

module.exports = mongoose.model('users',userSchema);
