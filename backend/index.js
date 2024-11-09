import app from "./src/app.js";
import { connectToMongoose } from "./src/config/connectToMongo.js";

// Define the port for the server
const PORT = process.env.PORT || 3000;

// Function to start the server and connect to MongoDB
const startServer = async () => {
  try {
    // Establish MongoDB connection
    await connectToMongoose();

    // Start the server and listen on the specified port
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    // Log any errors that occur during server startup
    console.error("Failed to start server:", error);
  }
};

// Call the startServer function to initiate server startup
startServer();
