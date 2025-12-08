// ============================================
// Main Server File - Entry Point of the Application
// ============================================

// Load environment variables from .env
require("dotenv").config();

// Import dependencies using CommonJS
const express = require("express");
const morgan = require("morgan");

// Connect to MongoDB
const connectDB = require("./config/db");

// Import student routes
const studentRoutes = require("./routes/studentRoutes");

// Create Express app
const app = express();

// ============================================
// MIDDLEWARE SETUP
// ============================================

// Parse incoming JSON
app.use(express.json());

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Log incoming requests (GET, POST, PUT, DELETE)
app.use(morgan("dev"));

// ============================================
// CONNECT TO DATABASE
// ============================================

connectDB(); // Connect to MongoDB

// ============================================
// ROUTES
// ============================================

// All CRUD endpoints for students
app.use("/api/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Student CRUD API",
    
  });
});

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
