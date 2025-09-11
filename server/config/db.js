import mongoose from "mongoose"
//to connect
const connectDB = async () =>{
    mongoose.connection.on('connected',()=> console.log('Database Connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/JobNest`)

}
export default connectDB