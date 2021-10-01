const mongoose = require('mongoose');
const Joi 	   = require('joi');

const profileSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	userName	: { type : String , required : true , unique : true , maxlength : 10 },
	name  		: { type : String , required : true ,},
	emails		: { type : String , required : true , unique : true },
	mobileNum  	: { type : String },
	role 		: { type : String },
	dob 		: { type : Date },
	gender 		: { type : String },
	dom 		: { type : Date },
	picUrl 		: { type : String },
	address 	: [{
						workplace 		: String,
						addressLine1	: String,
						addressLine2	: String,
						landmark 		: String,
						city 			: String,
						pincode 		: String,
					}],
	createdAt	: { type : Date , default : Date.now},
	createdBy	: { type : Number },
});

module.exports = mongoose.model('profiles',profileSchema);
