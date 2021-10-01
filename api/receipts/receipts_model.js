const mongoose = require('mongoose');
const Joi 	   = require('joi');

const receiptsSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	receiptId 		: { type : Number , required : true , unique : true },
	orderNum  		: { type : Number },
	totalAmount 	: { type : Number },
	modeOfPayment   : { type : String },
	createdAt		: { type : Date , default : Date.now},
	createdBy		: { type : Number },
});

module.exports = mongoose.model('receipts',receiptsSchema);
