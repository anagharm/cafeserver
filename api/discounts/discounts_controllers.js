const mongoose          = require("mongoose");
const Discount          = require('./discounts_model');
const ObjectID          = require('mongodb').ObjectID;

exports.adddiscount = (req,res,next)=> {
    Discount.find({dicscountCode : req.body.dicscountCode})
        .then(discount =>{
            if(discount.length > 0){
                res.status(200).json({
                                        responseCode 	: 1,
                                        responseMsg		: 'Discount already Exists',
                                        response 		: "",
                                    })
            }else{
                const discount = new Discount({
                    _id             : new mongoose.Types.ObjectId(),
                    typeofDiscount 	: req.body.typeofDiscount,
                    dicscountCode 	: req.body.dicscountCode,
                    discountAmt		: req.body.discountAmt,
                    description		: req.body.description,
                    discountCode  	: req.body.discountCode,
                    available   	: req.body.available,
                    discountFrom  	: req.body.discountFrom,
                    discountTo  	: req.body.discountTo,
                });
                discount.save()
                    .then(data=>{
                        res.status(200).json({
                                                responseCode 	: 0,
                                                responseMsg		: 'Discount Added',
                                                response 		: data._id,
                                            })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
            
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.patchdiscount = (req,res,next)=>{
    Discount.updateOne(
                        {
                            _id : mongoose.Types.ObjectId(req.body.id)
                        },
                        {
                            $set : {
                                typeofDiscount 	: req.body.typeofDiscount,
                                dicscountCode 	: req.body.dicscountCode,
                                discountAmt		: req.body.discountAmt,
                                description		: req.body.description,
                                discountCode  	: req.body.discountCode,
                                available   	: req.body.available,
                                discountFrom  	: req.body.discountFrom,
                                discountTo  	: req.body.discountTo,
                            }
                        }
        )
        .then(data=>{
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Menu Updated',
                                    response 		: req.body.id,
                                })
        })
        .catch(err =>{
            console.log(err.message);
            res.status(200).json({
                error: err.message
            });
        });
}

exports.listdiscount = (req,res,next)=>{
    Discount.aggregate([
                            {
                                $project : {
                                                discountCode : { $concat : ["$discountCode","-",{$toString:"$_id"}]},
                                                discountFrom : 1,
                                                discountTo   : 1,
                                                available    : 1,
                                            }
                            }
        ])
        .then(data=>{
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Discount List',
                                    response 		: data,
                                })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.discountdetails = (req,res,next)=>{
    Discount.findOne({_id : mongoose.Types.ObjectId(req.params.id)})
            .then(data=>{
                res.status(200).json({
                                        responseCode 	: 0,
                                        responseMsg		: 'Discount Details',
                                        response 		: data,
                                    })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });  
}

exports.deletediscount = (req,res,next)=>{
    Discount.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)})
            .then(data=>{
                res.status(200).json({
                                        responseCode 	: 0,
                                        responseMsg		: 'Discount Deleted',
                                        response 		: "",
                                    })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.listdiscountkeyvalue = (req,res,next)=>{
    Discount.aggregate([
                        {
                            $project : {
                                            "key"   : "$dicscountCode",
                                            "value" : "$_id"
                                       }
                        }
        ])
        .then(data=>{
            data.unshift({"key":"Select","value":"-"})
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Discount List',
                                    response 		: data,
                                })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}