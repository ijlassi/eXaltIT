import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to Mongoose!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectDB;
