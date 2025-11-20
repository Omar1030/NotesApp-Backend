import mongoose from "mongoose";

const connectDB = async () => {
  new Promise(() => {
    mongoose.connect(process.env.DB_CONNECTION);
  });
};

export default connectDB;
