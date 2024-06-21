const express=require('express')
const routes=express.Router();
const authController=require('../controllers/authController')
const rateLimit=require ('express-rate-limit')

// ip limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

routes.post("/register",limiter,authController.register)
routes.post("/login",limiter,authController.login)

module.exports=routes;