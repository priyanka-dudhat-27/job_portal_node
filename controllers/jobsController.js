module.exports.createJobs=async(req,res)=>{
    const {company,position}=req.body;
    if(!company || !position) {
        return res.status(400).json({message:'All fields are required'})
    }
   try {
    req.body.createdBy=req.user.userId;
    const job=await jobModel.create(req.body);
    if(job){
        return res.status(200).json({message:'Job created successfully',data:job})
    }else{
        return res.status(400).json({message:'Job not created'})
    }
   } catch (error) {
    console.log(error);
    return res.status(400).json({message:'Something wrong',error})
   }
}