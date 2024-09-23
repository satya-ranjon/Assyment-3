import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
};

// Start the server
const startServer = () => {
  server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

// Graceful Shutdown Handler
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received! Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log("Closed remaining connections");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Main function to start the server
const main = async () => {
  process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! Shutting down...", err);
    process.exit(1);
  });

  await connectDB();
  startServer();

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err: Error) => {
    console.error("UNHANDLED REJECTION! Shutting down...", err);
    if (server) {
      server.close(() => process.exit(1));
    } else {
      process.exit(1);
    }
  });

  // Handle SIGTERM and SIGINT signals
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};

main();
