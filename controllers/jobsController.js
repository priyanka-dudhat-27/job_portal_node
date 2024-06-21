const Jobs=require('../models/jobModel')
const mongoose=require('mongoose')
// create job
module.exports.createJobs=async(req,res)=>{
    const {company,position}=req.body;
    if(!company || !position) {
        return res.status(400).json({message:'All fields are required'})
    }
   try {
    req.body.createdBy=req.user.id;
    const job=await Jobs.create(req.body);
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

// get jobs
module.exports.getallJobs=async(req,res)=>{
    try {
        const jobsData=await Jobs.find({createdBy:req.user.id})
        if(jobsData){
            res.status(200).json({
                totalJobs:jobsData.length,
                jobsData,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:'something wrong',error})
    }
}

// updateJobs
module.exports.updateJobs= async(req,res)=>{
    try {
      const {id}=req.params;
      const {company,position}=req.body;
      if(!company || !position){
        return res.status(400).json({message:"All fields are required"})
      }

      const job=await Jobs.findOne({_id:id})
      if(!job){
        return res.status(400).json({message:`No jobs found with id ${id}`})
      }

      if(req.user.id !== job.createdBy.toString()){
        return res.status(400).json({message:'You are not authorized to update this job'})
      }

      const updatedJob=await Jobs.findByIdAndUpdate({_id:id},req.body,{new:true})
      if(updatedJob){
        return res.status(200).json({message:'Job updated successfully',data:updatedJob})
      }else{
        return res.status(400).json({message:'Job not updated'})
      }
    }catch(error){
        console.log(error)
        return res.status(400).json({message:"something wrong",error})
    }
} 
// delete job
module.exports.deleteJobs=async(req,res)=>{
    try {
        const {id}=req.params;

        const job=await Jobs.findOne({_id:id})
        if(!job){
            return res.status(400).json({message:`No jobs found with id ${id}`})
        }
        if(req.user.id!==job.createdBy.toString()){
            return res.status(400).json({message:'You are not authorized to delete this job'})
        }

        const deleteJob=await Jobs.findByIdAndDelete({_id:id})

        if(deleteJob){
            return res.status(200).json({message:'Job deleted successfully'})
        }else{
            return res.status(400).json({message:'Job not deleted'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong",error})
    }
}
