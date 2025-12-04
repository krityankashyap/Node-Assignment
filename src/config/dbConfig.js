import mongoose from "mongoose";
import { MONGODB_URI } from "./index.js";

export const connectDB= async() => {
  try {
    const db_url= MONGODB_URI;
    
    await mongoose.connect(db_url);
    console.log("Connected to mongoDB");

    mongoose.connection.on("error", (error)=>{
      console.log("error connection to mongoDB: ", error);
    });

    mongoose.connection.on("disconnected", (disconnected)=> {
      console.log("Disconnecetd to mongoDB: ", disconnected);
    });

  } catch (error) {
    console.log("Failed to connect with mongoDB: ", error);
    process.exit(1);
  }
}