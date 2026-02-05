// Inngest does not connect Clerk and MongoDB by itself, but it orchestrates the workflow that connects them reliably and asynchronously.Inngest runs background tasks like saving Clerk users into MongoDB without slowing the server.
import { connectDB } from "./db.js";
import {Inngest} from "inngest";
import User from "../models/User.js";
//instance of connecting to stream used here so from here we can call the functions and save or delete user in stream
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest=new Inngest({id : "InterVue"}); //we are creating an Inngest object (instance) so we can use inngest.

const syncUser= inngest.createFunction(
    {id:"sync-user"}, //function name
    {event:"clerk/user.created"}, //event that trigger this function
    async({event})=>{

        await connectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
    };

    await User.create(newUser);
         
    await upsertStreamUser({  //creating or updating user in stream
      name:newUser.name,
      image:newUser.profileImage,
      id:newUser.clerkId.toString()
    });

    //challenge : sending mail logic likho

    }
)

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString()); //deleteing user in stream

  }
);

export const functions =[syncUser, deleteUserFromDB];