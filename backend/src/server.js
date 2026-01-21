//defined module in type in package js allow to use import and export
import express from "express";
import dotenv from "dotenv";

dotenv.config();


// console.log(process.env.PORT)

const app=express();

app.get("/",(req,res)=>{
    console.log("hey");
})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000");
})


//included serevr file in src folder