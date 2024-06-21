const express=require('express');
const { loginRequire } = require('../middlewares/loginRequire');
const routes=express.Router();
const jobsController=require('../controllers/jobsController')

routes.post('/createJobs',loginRequire,jobsController.createJobs)
routes.get('/getallJobs',loginRequire,jobsController.getallJobs)
routes.put('/updateJobs/:id',loginRequire,jobsController.updateJobs)
routes.delete('/deleteJobs/:id',loginRequire,jobsController.deleteJobs)

module.exports=routes;