const express = require("express");
const jwt = require("jsonwebtoken");
//post model
const { PostModel } = require("../models/post.model"); 
const { UserModel } = require("../models/user.model");


const postRouter = express.Router();


//read -> get all the post for particular user
postRouter.get("/",async(req,res)=>{
    const {userId} = req.body;
    console.log(userId);
    try{
        const users = await PostModel.find({userId});
        res.status(200).send({success:true,data:users});
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});


//create -> post your post
postRouter.post("/add",async(req,res)=>{
    try{
        const payload = req.body;
        console.log("payload",payload);
        const post = new PostModel(payload);
        const postSave = await post.save();
        res.status(200).send({success:true,data:postSave});
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});

//update
postRouter.update("/update/:postId",async(req,res)=>{
    const {postId} = req.params;
    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwt.verify(token,"key");

    const payload = req.body

    try{
        const findUser = await UserModel.findOne({_id:decoded.userId});
        const findPost = await PostModel.findOne({_id:postId});
        if(findPost.userId==findUser._id){
            await PostModel.findByIdAndUpdate({_id:postId},payload);
            res.status(200).send({success:true,message:'updated successfully'});
        }else{
            res.status(400).send({success:false,message:"not authorize login first"});
        }
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});

postRouter.delete("/delete/:postId",async(req,res)=>{
    const {postId} = req.params;
    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwt.verify(token,"key");

    try{
        const findUser = await UserModel.findOne({_id:decoded.userId});
        const findPost = await PostModel.findOne({_id:postId});
        if(findPost.userId==findUser._id){
            await PostModel.findByIdAndDelete({_id:postId});
            res.status(200).send({success:true,message:'updated successfully'});
        }else{
        res.status(400).send({success:false,message:"not authorize login first"});
        }
    }
    catch(err){
        res.status(400).send({success:false,message:err});
    }
});

module.exports = {
    postRouter
}