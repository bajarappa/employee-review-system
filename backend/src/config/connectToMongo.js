// Importing the mongoose library and dotenv for environment variable handling
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Function to connect to MongoDB using mongoose
export const connectToMongoose = async () => {
  try {
    // Connecting to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.DB_URI);

    // Logging a success message if the connection is successful
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    // Logging an error message if there is an issue connecting to the database
    console.log("Error while connecting to db", err);
  }
};
