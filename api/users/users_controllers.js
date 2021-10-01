const mongoose          = require("mongoose");
const bcrypt            = require("bcrypt");
const jwt               = require("jsonwebtoken");
const globalVariable    = require("../../nodemon.js");
const User              = require('./users_model');
const Profile           = require("../profiles/profiles_model.js");
var axios               = require('axios');

exports.signup = (req,res,next)=>{
	if(req.body.mobileNum && req.body.password){
		User.find({userName:req.body.mobileNum})
			.exec()
			.then(user =>{
				if(user.length >= 1){
					return res.status(409).json({
						message: 'Mobile Number already registered.'
					});
				}else{
					bcrypt.hash(req.body.password,10,(err,hash)=>{
						if(err){
							return res.status(500).json({
								error:err
							});
						}else{
							const user = new User({
											_id         : new mongoose.Types.ObjectId(),
											createdAt	: new Date,
											password    : {
															bcrypt:hash
														},
											userName	: req.body.mobileNum,
											emails      : req.body.emailId,
                                            verified    : true,
											roles 		: req.body.role ? (req.body.role).toLowerCase() : 'user'
							});	
							user.save()
								.then(result =>{
                                    const profile = new Profile({
                                        _id         : new mongoose.Types.ObjectId(),
                                        userName	: req.body.mobileNum,
                                        mobileNum	: req.body.mobileNum,
                                        emails      : req.body.emailId,
                                        name        : req.body.name,
                                        verified    : true,
                                        roles 		: req.body.role ? (req.body.role).toLowerCase() : 'user'
                                    });
                                    profile.save()
                                            .then(profile => {
                                                res.status(200).json({
													responseCode 	: 0,
                                                    responseMsg		: 'User created',
                                                    response 		: result._id,
                                                })
                                            })
                                            .catch(err =>{
                                                console.log(err);
                                                res.status(500).json({
                                                    error: err
                                                });
                                            });
								})
								.catch(err =>{
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
						}			
					});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}else{
		res.status(200).json({message:"Mobile Number and password are mandatory"});
	}
};

exports.signin = (req,res,next)=>{
	User.findOne({emails:req.body.emailId})
		.exec()
		.then(user => {
			if(user){
				var pwd = user.password.bcrypt;
				if(pwd){
					bcrypt.compare(req.body.password,pwd,(err,result)=>{
						if(err){
							return res.status(200).json({
													responseCode 	: 1,
													responseMsg		: 'Please verify password',
													response 		: ""
												})
						}
						if(result){
							const token = jwt.sign({
								email 	: req.body.emailId,
								userId	:  user._id ,
							},globalVariable.JWT_KEY,
							{
								expiresIn: "1d"
							}
							);
							User.updateOne(
									{emails:req.body.emailId},
									{
										$push : {
											"loginTokens" : {
													when: new Date(),
													hashedToken : token
												}
										}
									}
								)
								.exec()
								.then(updateUser=>{
									if(updateUser.modifiedCount === 1){
										res.status(200).json({
																responseCode 	: 0,
																responseMsg		: 'Auth Successful',
																response 		: {
																					token : token,
																					user  : user.id,
																					role  : user.role
																				  }
															})
									}else{
										res.status(200).json({
																responseCode 	: 1,
																responseMsg		: 'Please try again',
																response 		: ""
															})
									}
								})
								.catch(err=>{
									console.log("500 err ",err);
									res.status(500).json(err);
								});	
						}	
					})
				}else{
					res.status(200).json({
											responseCode 	: 1,
											responseMsg		: 'Please verify password',
											response 		: ""
										})
				}
			}else{
				res.status(200).json({
										responseCode 	: 1,
										responseMsg		: 'User Not Found',
										response 		: ""
									})
			}			
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};
