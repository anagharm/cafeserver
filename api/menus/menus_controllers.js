const mongoose          = require("mongoose");
const Menu              = require('./menus_model');
const ObjectID          = require('mongodb').ObjectID;

exports.addmenu = (req,res,next)=> {
    Menu.find({menu : req.body.menu})
        .then(menu =>{
            if(menu.length > 0){
                res.status(200).json({
                                        responseCode 	: 1,
                                        responseMsg		: 'Menu already Exists',
                                        response 		: "",
                                    })
            }else{
                const menu = new Menu({
                    _id         : new mongoose.Types.ObjectId(),
                    menu        : req.body.menu,
                    description	: req.body.description,
                    price  		: req.body.price,
                    available   : req.body.available,
                });
                menu.save()
                    .then(data=>{
                        res.status(200).json({
                                                responseCode 	: 0,
                                                responseMsg		: 'Menu Added',
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

exports.patchmenu = (req,res,next)=>{
    Menu.updateOne(
                        {
                            _id : mongoose.Types.ObjectId(req.body.id)
                        },
                        {
                            $set : {
                                menu        : req.body.menu,
                                description	: req.body.description,
                                price  		: req.body.price,
                                available   : req.body.available,
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

exports.listmenu = (req,res,next)=>{
    Menu.aggregate([
                        {
                            $project : {
                                            menu        : { $concat : ["$menu","-",{$toString:"$_id"}]},
                                            description	: 1,
                                            price  		: 1,
                                            available   : 1,

                                        }
                        }
        ])
        .then(data=>{
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Menu List',
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

exports.menudetails = (req,res,next)=>{
    console.log("menu Id ",req.params.id)
    Menu.findOne({_id : mongoose.Types.ObjectId(req.params.id)})
        .then(data=>{
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Menu Details',
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

exports.deletemenu = (req,res,next)=>{
    Menu.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)})
        .then(data=>{
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Menu Deleted',
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

exports.listmenukeyvalue = (req,res,next)=>{
    Menu.aggregate([
                        {
                            $project : {
                                            "key"   : "$menu",
                                            "value" : "$_id"
                                       }
                        }
        ])
        .then(data=>{
            data.unshift({"key":"Select","value":"-"})
            res.status(200).json({
                                    responseCode 	: 0,
                                    responseMsg		: 'Menu List',
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