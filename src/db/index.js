import mongoose from "mongoose";
const DB_NAME = "pharma";

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
      { dbName: DB_NAME }
    );
    console.log(
      "\n MongoDB connection successfull : ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("MongoDB connection error : ", error);
    process.exit(1);
  }
};
export default connectDB;
