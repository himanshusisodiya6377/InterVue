//add what if chat and video call fail after session save in db
import { chatClient,streamclient } from "../lib/stream.js";
import Session from "../models/Session.js";

export const createSession=async(req,res)=>{
    try{
        
        const {problem,difficulty}=req.body;
        const id=req.user._id;
        const clerkId=req.user.clerkId;

        if(!problem || !difficulty) return res.status(400).json({message:"problem and difficulty are required !"});
        
        //creating a unique call id
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        //create session
        const session = await Session.create({problem,difficulty,host : id,callId});

         // create stream video call
        await streamClient.video.call("default", callId).getOrCreate({
          data: {
            created_by_id: clerkId,
            custom: { problem, difficulty, sessionId: session._id.toString() },
          },
        });

        // chat messaging
        const channel = chatClient.channel("messaging", callId, {
          name: `${problem} Session`,
          created_by_id: clerkId,
          members: [clerkId],
        });

        await channel.create();

        res.status(201).json({session});

    }
    catch(error){
        console.error("error in creatSession controller!");
        res.status(500).json({message:"session creation failed!"});
    }
}

export const getActiveSessions= async(req,res)=>{
    try{
        const session = await (await Session.find({status:"active"}).populate("host").populate("participant")).sort({createdAt : -1}).limit(20);
        res.status(201).json({session});
    }
    catch(error){
        console.error("error in getActiveSessions controller!");
        res.status(500).json({message:"getting active session failed!"});
    }
}

export const getMyRecentSessions = async(req,res)=>{
    try{
        const id=req.user._id;
        const session = await (await Session.find({status:"completed",$or:[{host : id},{participant : id}]}).populate("host").populate("participant")).sort({createdAt : -1}).limit(20);
        res.status(201).json({session});
    }
    catch(error){
        console.error("error in getMyRecentSessions controller!");
        res.status(500).json({message:"getting recent active session failed!"});
    }
}

export const getSessionById = async(req,res)=>{
    try{
        const {id}=req.params;
        const session = await (await Session.findById(id).populate("host").populate("participant")).sort({createdAt : -1}).limit(20);
        if (!session) return res.status(404).json({ message: "Session not found" });
        res.status(201).json({session});
    }
    catch(error){
        console.error("error in getSessionById controller!");
        res.status(500).json({message:"getting session by id failed!"});
    }
}

export const joinSession = async(req,res)=>{
    try{
        
        const {id}=req.params;
        const userId=req.user._id;
        const clerkId=req.user.clerkId;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ message: "Session not found" });

        if(session.status!="active"){
            return res.status(400).json({ message: "Cannot join a completed session" });
        }

        if(session.host.toString()==userId.toString()){
             return res.status(400).json({ message: "Host cannot join their own session as participant" });
        }

        if(session.participant){
            return res.status(409).json({ message: "Session is full" });
        }

         session.participant = userId;
         await session.save();

         const channel = chatClient.channel("messaging", session.callId);
         await channel.addMembers([clerkId]);

         res.status(200).json({ session });
    }
    catch(error){
        console.error("error in joinSession controller!");
        res.status(500).json({message:"joining session is failed!"});
    }
}

export const endSession = async(req,res)=>{
    try{
        
        const {id}=req.params;
        const userId=req.user._id;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ message: "Session not found" });

        if (session.host.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Only the host can end the session" });
        }

         // check if session is already completed
        if (session.status === "completed") {
        return res.status(400).json({ message: "Session is already completed" });
        }

        // delete stream video call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({ hard: true });

        // delete stream chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

         session.status = "completed";
         await session.save();

         res.status(200).json({ session, message: "Session ended successfully" });
    }
    catch(error){
         console.error("error in endSession controller!");
        res.status(500).json({message:"ending session is failed!"});
    }
}