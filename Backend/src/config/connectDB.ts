import mongoose from "mongoose";
import config from "./confiq.js";

export const connectDB = async () => {
  try {
    const {connection} = await mongoose.connect(config.mongoURI as string)
    console.log(`MongoDB connected with ${connection.host}`);

    return connection.host
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}