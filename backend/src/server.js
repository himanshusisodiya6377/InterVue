//defined module in type in package js allow to use import and export
import express from "express";
import dotenv from "dotenv";
//path is a Node.js built-in module.path helps us work with file paths safely
import path from "path";

dotenv.config();

//The full path of the current working directory
const __dirname=path.resolve();

//This code allows your Node.js backend to serve your React app in production, enabling single-server deployment with proper client-side routing.
if(process.env.NODE_ENV=="production"){ //both frontend and backend should run on same port
   
    //express.static is just used to tell Express where our frontend files are kept.
    app.use(express.static(path.json(__dirname,"../frontend/dist")));
    
    //No matter what URL the user opens, send index.html but thoose that backend not understand
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })

}

const app=express();

app.get("/",(req,res)=>{
    console.log("hey");
})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000");
})


//included serevr file in src folder