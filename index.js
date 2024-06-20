const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const port=process.env.PORT||5000
const express_async_errors=require ('express-async-errors')
const morgan=require('morgan')
const cors=require('cors')
app.use(cors({
    credentials:true,
    methods:['GET','POST'],
}))

app.use(morgan('dev'))

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

app.listen(port,async(err)=>{
    (err)?console.log(er):console.log(`server is running on port ${port}`)
})