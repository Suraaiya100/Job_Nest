import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
//express
const app = express()

// connect to db
await connectDB()
// middlewares
app.use(cors())
app.use(express.json())
//routes
app.get('/',(req,res)=> res.send("API WORKING"))
//port
const Port = process.env.Port || 5000
app.listen(Port,()=>{
    console.log(`Server is  running pn port ${Port}`)
})

