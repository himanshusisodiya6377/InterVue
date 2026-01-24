import { chatClient } from "../lib/stream.js";

export const getStreamToken = async(req,res)=>{
    try{
         // use clerkId for Stream (not mongodb _id)=> it should match the id we have in the stream dashboard
        const token=chatClient.createToken(req.user.clerkId);
        
        //sending stream token to frontend 
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image,
        })
    }
    catch(error){
        console.log("error in getStreamToken Controller!",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}