const express=require("express")
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/usermodel")
const jwt=require("jsonwebtoken")
const userRoute=express.Router()


userRoute.post("/register",async(req,res)=>{
    try {
        const {name,email,password,isAdmin}=req.body
      bcrypt.hash(password,5,(err,hash)=>{
        const user=new UserModel({name,email,password:hash,isAdmin})
        user.save()
        res.status(201).send({"msg":"New user has been registered successfully"})
      })
    } catch (error) {
        res.status(500).send({"msg":"Error in registering new user",error})
    }
})


userRoute.post("/login",async(req,res)=>{
    try {
        const{email,password}=req.body
        const user=await UserModel.findOne({email})
        bcrypt.compare(password, user.password, (err, result)=>{
           if(result){
            const token = jwt.sign({ userID:user._id }, 'masai');
            res.status(200).send({"msg":"user logged in successfully",token})
           }
           else{
            res.status(500).send({"msg":"Error occured"})
           }
        });
    } catch (error) {
        res.status(500).send({"msg":"Invalid credntials"})
    }
})




module.exports={
    userRoute
}