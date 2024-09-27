import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("connection to DB successful", conn.connection.host);
    } catch (error) {
        console.log('Error in connecting to DB: ', error);
        process.exit(1)// failure to connect
        
    }
}