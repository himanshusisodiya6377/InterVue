import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

export const connectDB=async()=>{
    try{
       const conn=await mongoose.connect(process.env.DB_URL)
       console.log("connected to Database")
    }
    catch(error){
       console.error("Database connection failed",error)
       process.exit(1)
    }
};