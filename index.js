// api documentation
const swaggerUi =require('swagger-ui-express')
const swaggerDoc=require('swagger-jsdoc')
const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const port=process.env.PORT||5000
const express_async_errors=require ('express-async-errors')
// security packages
const helmet=require('helmet')
const mongoSanitize=require('express-mongo-sanitize')
const rateLimit=require ('express-rate-limit')

const morgan=require('morgan')
const cors=require('cors')
app.use(cors({
    credentials:true,
    methods:['GET','POST','PUT','DELETE'],
}))

app.use(morgan('dev'))
app.use(helmet());
app.use(mongoSanitize());

// swagger api config
// swagger api options
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"job portal application",
            description:"Node Express.js job portal application"
        },
        servers:[
            {
                // url:"http://localhost:8001"
                url:"https://job-portal-node.onrender.com"
            }
        ]
    },
    apis:["./routes/*.js"],
};

const spec=swaggerDoc(options)


//mongodb connectivity
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
}).then((res)=>console.log('db is connected'))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use('/api/v1',require('./routes/index'))

// homeroutes.root
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec));

app.listen(port,async(err)=>{
    (err)?console.log(er):console.log(`server is running on port ${port}`)
})