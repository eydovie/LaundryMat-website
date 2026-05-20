// config/db.js
// Mongoose is the ODM (Object Document Mapper) that lets us
// interact with MongoDB using JavaScript objects instead of
// raw database queries.
import process from "node:process";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise — we await it.
    // process.env.MONGO_URI reads from our .env file.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, log the error and exit the process.
    // process.exit(1) means "exit with failure" — stops the server.
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
