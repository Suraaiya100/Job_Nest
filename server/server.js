import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db'
//express
const app = express()

// connect to db
await connectDB
// middlewares
app.use(cors())
app.use(express.json())
//routes
app.get('/',(req,res)=> res.send("API WORKING"))
//port
const port = process.env.port || 5000
app.listen(port,()=>{
    console.log(`Server is  running pn port ${port}`)
})

