const express=require('express');
const { loginRequire } = require('../middlewares/loginRequire');
const routes=express.Router();
const jobsController=require('../controllers/jobsController')

routes.post('/createJobs',loginRequire,jobsController.createJobs)

module.exports=routes;