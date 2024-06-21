const User=require('../models/userModel')

module.exports.updateUser=async(req,res)=>{
    const {name,lastName,email,location}=req.body;
    if(!name||!lastName||!email||!location){
        return res.status(400).json({message:'All fields are required'})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const userData=await User.findById(req.user.id)
        if(!userData){
            return res.status(400).json({message:'User not found'})
        }

        const updateData={          
            name,
            lastName,
            email,
            location,
            lastName
        }

        const updateUser=await User.findByIdAndUpdate(req.user.id,updateData,{new:true})
        if(updateUser){
            return res.status(200).json({message:'User updated successfully',data:updateUser})
        }else{
            return res.status(400).json({message:'User not updated'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:'Something Wrong',error})
    }

}

