const mongoose          = require("mongoose");
const globalVariable    = require("../../nodemonconfig.js");
const Profile           = require("../profiles/profiles_model.js");
var axios               = require('axios');

exports.listuser = (req,res,next)=>{
	Profile.aggregate([
                            {
                                $project: {
                                                "name"      : { $concat : ["$name","-",{$toString:"$_id"}]},
                                                "emails"    : 1,
                                                "mobileNum" : 1,
                                                "role"      : 1
                                          }
                            }
            ])
            .then(data=>{
                res.status(200).json({
                                        responseCode 	: 0,
                                        responseMsg		: 'User List',
                                        response 		: data,
                                    })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};

exports.userdetails = (req,res,next)=>{
	Profile.findOne({_id : mongoose.Types.ObjectId(req.params.id)})
            .then(data=>{
                res.status(200).json({
                                        responseCode 	: 0,
                                        responseMsg		: 'User List',
                                        response 		: data,
                                    })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};

exports.patchuserdetails = (req,res,next) => {
    Profile.findOne({_id : mongoose.Types.ObjectId(req.body.id)})
            .then(profile=>{
               //Start
               axios({
                    method  : 'get',
                    url 	: globalVariable.APIURL + '/api/role/get/roledetails/'+req.body.roleId
                })
                .then(role =>{
                    Profile .updateOne(
                                        { _id : mongoose.Types.ObjectId(req.body.id) },
                                        {
                                            $set : {
                                                        userName	: req.body.mobileNum,
                                                        mobileNum	: req.body.mobileNum,
                                                        emails      : req.body.emailId,
                                                        name        : req.body.name,
                                                        dob 		: req.body.dob,
                                                        gender 		: req.body.gender,
                                                        dom 		: req.body.dom,
                                                        role        : role.data.response.role,
                                                        roleId      : req.body.roleId
                                                    }
                                        }
                            )
                            .then(data=>{
                                if(
                                    (profile.mobileNum === req.body.mobileNum) && 
                                    (profile.emails === req.body.emailId) && 
                                    (profile.roleId === req.body.roleId) && 
                                    (profile.name === req.body.name)
                                ){
                                    res.status(200).json({
                                                        responseCode 	: 0,
                                                        responseMsg		: 'User Details Updated',
                                                        response 		: req.body.id,
                                                    })
                                }else{
                                    axios({
                                        method  : 'patch',
                                        url 	: globalVariable.APIURL + '/api/user/patch/updateuser',
                                        data    : {
                                                        userName	: profile.userName,
                                                        mobileNum	: req.body.mobileNum,
                                                        emails      : req.body.emailId,
                                                        role 		: req.body.role,
                                                        roleId 		: req.body.roleId,
                                                    }
                                    })
                                    res.status(200).json({
                                        responseCode 	: 0,
                                        responseMsg		: 'User Details Updated',
                                        response 		: req.body.id,
                                    })
                                }
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
               //End 
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};