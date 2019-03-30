const mongoose= require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require ('../models/user');



exports.user_signup =(req,res,next)=>{

    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1)//bos mail adresi gondermesin diye
        {
            return res.status(409).json({
                message:'email adresi kullaniliyor'
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else {
                    const user= new User({
                        _id:new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password:hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message:'Kullanici Olusturuldu'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    
                    });
                }
            })
           

        }
    })
 

    
}

exports.user_login= (req,res,next) =>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1 ){
            return res.status(401).json({
                message:'giris basarisiz'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'giris basarisiz'
                });
            }

            if(result){
               const token= jwt.sign({   //KRIPTOLAMA YAPMIS ADAMLAR VAY AMK JWT.COM
                    email:user[0].email,
                    userId:user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                },

            );
                return res.status(200).json({
                    message:'giris basarili',
                    token:token
                });

            }
                res.status(401).json({
                message:'giris basarisiz'
            });
        })

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    
    });
}

