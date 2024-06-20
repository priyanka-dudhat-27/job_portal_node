const jwt = require('jsonwebtoken');
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
        // Find the user by ID
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.location = location;

        // Save the updated user
        await user.save();

        // Create a new token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        // Send response
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                location: user.location,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}