//defined module in type in package js allow to use import and export
import express from "express";
import dotenv from "dotenv";
//path is a Node.js built-in module.path helps us work with file paths safely
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express";
import { inngest,functions } from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express';
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config();

//The full path of the current working directory
const __dirname=path.resolve();

const app=express();
app.use(clerkMiddleware()) // this adds auth field to request object: req.auth() which we will later use to authenticate it has many fields

//middleware

//express.json() is a built-in middleware in Express.js that reads JSON data from the request body and converts it into a JavaScript object available as req.body.
app.use(express.json());

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}));

//This line creates an API route in our backend.That route is used by Inngest to run background tasks
//serve coonect inngest with our server
app.use("/api/inngest",serve({client : inngest,functions}))
app.use("/api/chat",chatRoutes);
app.use("/api/session",sessionRoutes);


//This code allows your Node.js backend to serve your React app in production, enabling single-server deployment with proper client-side routing.
if(process.env.NODE_ENV=="production"){ //both frontend and backend should run on same port
   
    //express.static is just used to tell Express where our frontend files are kept.
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    
    //No matter what URL the user opens, send index.html but thoose that backend not understand
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })

}


app.get("/",(req,res)=>{
    res.send("hey");
})


const StartServer=async()=>{
try{
    await connectDB();
    app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
}
catch(error){
    console.log("Error in starting the server",error)
}
}
//just created a fuction to look structured
StartServer();


//included serevr file in src folder