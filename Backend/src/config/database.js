import mongoose from "mongoose";
import "dotenv/config";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to database");
  } catch (error) {
    console.log(error)
  }
};

export default connectToDB ;