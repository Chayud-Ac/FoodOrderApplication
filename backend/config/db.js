import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  await mongoose.connect(mongoURI).then(() => console.log("DB connected"));
};
