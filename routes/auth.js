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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password (should be greater than 6 characters)
 *         location:
 *           type: string
 *           description: User's location (city or country)
 *       example:
 *         id: HVHGU564985
 *         name: John
 *         lastName: Doe
 *         email: johndoe@gmail.com
 *         password: 1234567
 *         location: Surat
 */

/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: Authentiation APIs
 */


 /**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       500:
 *         description: Internal server error
 */


routes.post("/register",limiter,authController.register)
routes.post("/login",limiter,authController.login)

module.exports=routes;