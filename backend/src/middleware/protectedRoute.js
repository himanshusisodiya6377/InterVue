import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

//we can run array element seperately in app.use but we craeted a file and a array that further flatten and apply one by one
export const protectedRoute=[
    //It only checks whether the user is logged in with Clerk or not/simple logged in he ya nhi.
    requireAuth(),
    async(req,res,next)=>{
        try{

            const clerkId=req.auth().clerkId;
            if(!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });
            //find user by clearkID
            const user = await User.findOne({clerkId});
            if (!user) return res.status(404).json({ message: "User not found" });
            req.user=user;
            next();

        }
        catch(error){
            console.log("error is in protected route!");
            res.status(500).json({ message : "Interval Server Error"})
        }
    }
]