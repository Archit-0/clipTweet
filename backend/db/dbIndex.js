import mongoose from "mongoose";
import { dbName } from "../constant.js";
const connectDb = async()=>{
    try {
        const instance = await mongoose.connect(`${process.env.Mongo_url}/${dbName}`)
        console.log("MongoDB connected host: ", instance.connection.host);
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);

        console.log("MongoDB connection failed. Exiting now...");
        process.exit(1);
    }
}
export default connectDb;