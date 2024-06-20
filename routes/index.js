const express=require('express')
const routes=express.Router()

routes.use('/test',require('./test'))
routes.use('/auth',require('./auth'))
routes.use('/user',require('./user'))

module.exports=routes;