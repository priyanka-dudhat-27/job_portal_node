const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

module.exports.register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({message:'All fields are required'})
        }

        const existingUser=await User.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }

        req.body.password=await bcrypt.hash(password,12)
        const userData=await User.create(req.body);
        if(userData){
            return res.status(200).json({message:"User register successfully",data:userData})
        }else{
            return res.status(400).json({message:"User not register"})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Something Wrong',error})
    }
}

module.exports.login=async(req,res)=>{
    
        const {email,password}=req.body;
        const userData=await User.findOne({email:email})
        if(userData){
            const matchPass=await bcrypt.compare(password,userData.password)
            if(matchPass){
                const token=jwt.sign({_id:userData},process.env.JWT_SECRET,{expiresIn:"24h"})
                return res.status(200).json({message:"Login successfully",data:userData,token:token})
            }else{
                return res.status(400).json({message:"Password not match"})   
            }
        }else{
            return res.status(200).json({message:"Email not match"})
        }
    
}