const express=require('express')
const routes=express.Router()

routes.use('/test',require('./test'))
routes.use('/auth',require('./auth'))
routes.use('/user',require('./user'))
routes.use('/jobs',require('./jobs'))

module.exports=routes;