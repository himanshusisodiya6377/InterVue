import mongoose, { mongo } from "mongoose";

const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profileImage:{
        type:String,
        default:"",
    },
    // help to know user clerk id where it store in clerk and each user has its unique
    clerkId : {
       type:String,
       unique:true,
       required:true,
    },
},{timestamps:true});

const User = mongoose.model("User",Userschema);

export default User;