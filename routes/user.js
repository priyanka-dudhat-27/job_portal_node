const express=require('express');
const { loginRequire } = require('../middlewares/loginRequire');
const routes=express.Router()
const userController = require('../controllers/userController')

routes.put("/updateUser",loginRequire,userController.updateUser)

module.exports=routes;