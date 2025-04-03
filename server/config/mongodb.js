
// it has the function taht connects with database

// in 10th line there is autho that is supposed to be the name of the porject. but for now i have kept it autho

import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log("Database Connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/autho`);
};

export default connectDB;