const express=require('express')
const routes=express.Router()
const testController=require('../controllers/testControllers')

routes.post('/',testController.test)

module.exports=routes;