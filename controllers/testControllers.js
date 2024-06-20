module.exports.test=async(req,res)=>{
    try {
        const {name}=req.body
        return res.status(200).json({message:`Your name is ${name}`})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Something Wrong',error})
    }
}