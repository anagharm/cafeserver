const mongoose          = require("mongoose");
const Role              = require('./roles_model');
const ObjectID          = require('mongodb').ObjectID;
exports.addrole = (req,res,next)=> {
    Role.find({role : req.body.role})
        .then(role =>{
            if(role.length > 0){
                res.status(200).json({
                                        responseCode 	: 1,
                                        responseMsg		: 'Role already Exists',
                                        response 		: "",
                                    })
            }else{
                const role = new Role({
                    _id         : new mongoose.Types.ObjectId(),
                    role        : req.body.role,
                });
                role.save()
                    .then(data=>{
                        res.status(200).json({
                                                responseCode 	: 0,
                                                responseMsg		: 'Role Added',
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
            
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.patchrole = (req,res,next)=>{
    console.log("data role",req.body)
    Role.updateOne(
                        {
                            _id : mongoose.Types.ObjectId(req.body.id)
                        },
                        {
                            $set : {
                                role : req.body.role
                            }
                        }
        )
        .then(data=>{
            console.log("data ",data)
            res.status(200).json({
                                    responseCode 	: 1,
                                    responseMsg		: 'Role Updated',
                                    response 		: "",
                                })
        })
        .catch(err =>{
            console.log(err.message);
            res.status(200).json({
                error: err.message
            });
        });
}

exports.listrole = (req,res,next)=>{
    Role.find()
        .then(data=>{
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Role List',
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

exports.roledetails = (req,res,next)=>{
    
}

exports.deleterole = (req,res,next)=>{
    Role.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)})
        .then(data=>{
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Role Deleted',
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