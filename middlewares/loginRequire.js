const mongoose=require('mongoose')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

module.exports.loginRequire=async(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        if(!authorization){
            return res.status(400).json({message:'please Login first'})
        }

        const token=await authorization.replace("Bearer ","")
        jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
            if(err){
                return res.status(400).json({message:'Invalid or Expired token,Please Login first'})
            }else{
                const { _id } = payload;
                const userData = await User.findById(_id);
                if (!userData) {
                    return res.status(401).json({ message: 'User not found' });
                }
                
                req.user = userData;
                next();
            }
        })
    }catch(error){
        return res.status(400).json({message:'Something Wrong',error})
    }
}
