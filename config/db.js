// db.js

// Import mongoose, the library we use to connect to MongoDB
const mongoose = require('mongoose');

// Load environment variables from the .env file into process.env
require('dotenv').config();

// Get the MongoDB connection string from the .env file
const uri = process.env.MONGODB_URI;

// Get the database name from .env, or use "student_db" as a fallback
const dbName = process.env.DB_NAME || 'student_db';

// This function connects to MongoDB using mongoose
async function connectDB() {
  try {
    // Attempt the connection
    await mongoose.connect(uri, {
      dbName,                 // The specific database we want to use
    });

    // If successful, print a confirmation message
    console.log(`✅ MongoDB connected to database: ${dbName}`);

  } catch (err) {
    // If something goes wrong, log the error message
    console.error('❌ MongoDB connection error:', err.message);

    // Exit the application so we notice the error immediately
    process.exit(1);
  }
}

// Export the function so other files (like server.js) can use it
module.exports = connectDB;
