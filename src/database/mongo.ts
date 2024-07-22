import mongoose, { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config()

async function dbConnect(): Promise<void> {
  mongoose.set('strictQuery', false);
  const MONGO_URL = String(process.env.MONGO_URL);
  await connect(MONGO_URL);
}

export default dbConnect;