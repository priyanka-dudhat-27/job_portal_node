const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Company name is required"]
    },
    position:{
        type:String,
        required:[true,"Position is required"],
        minlength:100,
    },
    status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'fulltime'
    },
    workLocation:{
        type:String,
        default:'Mumbai',
        required:[true,'work location is required']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps:true
})

const Job=mongoose.model('Job',jobSchema);
module.exports=Job;