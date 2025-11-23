import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/12"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("error occured", error);
  }
};
export default connectDB;
