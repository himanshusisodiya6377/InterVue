//Create or update users in Stream
//Used to talk to Stream servers
import {StreamChat} from "stream-chat";
import dotenv from "dotenv";
import {StreamClient} from "@stream-io/node-sdk";

dotenv.config();

const apikey=process.env.STREAM_API_KEY
const apisecret=process.env.STREAM_API_SECRET

if(!apikey || !apisecret){
    console.error("apikey or apisecret is missing!")
}

export const streamclient=new StreamClient(apikey,apisecret); //help to use video feature and connect stream with our backend or Login to Stream as the backend
export const chatClient=StreamChat.getInstance(apikey,apisecret); //help to use chat feature and connect stream with our backend or Login to Stream as the backend

export const upsertStreamUser = async(UserData)=>{ 
   try{
       await chatClient.upsertUser(UserData); //upsertUser means handle creat and update user
       console.log("Stream user upserted successfully:", UserData);
   }
   catch(error){
        console.error("Error upserting Stream user:", error);
   }
};


export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    console.error("Error deleting the Stream user:", error);
  }
};