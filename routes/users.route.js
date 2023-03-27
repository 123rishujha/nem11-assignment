const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//usermodel
const { UserModel } = require("../models/user.model");


const userRoute = express.Router();


// //register
userRoute.post("/register", async(req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body;

    const existUser = await UserModel.findOne({email});

    if(existUser){
        res.status(400).send({success:false,message:"User already exist, please login"});
    }
    else{
        try{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    const user = new UserModel({name,email,gender,password:hash,age,city,is_married});
                    const saveUser = await user.save();
                    res.status(200).send({success:true,data:saveUser});
                }else{
                    res.status(400).send({success:false,message:err.message});
                }
            })
        }
        catch(err){
            res.status(400).send({success:false,message:err.message});
        }
    }
    
});



// login
userRoute.post("/login", async(req,res)=>{
    const {email,password} = req.body
    try{
        const existUser = await UserModel.findOne({email});
        if(existUser){
            bcrypt.compare(password,existUser.password,async(err,result)=>{
                if(result){
                    res.status(200).send({success:true,token:jwt.sign({"userId":existUser._id},"key")});
                }else{
                    res.status(400).send({success:false,message:"wrong credential"});   
                }
            })
        }else{
            res.status(400).send({success:false,message:"user not found,you may enter wrong credential"});   
        }
    }
    catch(err){
        res.status(400).send({success:false,message:err.message});
    }
});


module.exports = {
    userRoute
}

