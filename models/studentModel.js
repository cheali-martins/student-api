// ============================================
// Student Model - Mongoose Schema Definition
// ============================================

// Import mongoose using CommonJS
const mongoose = require("mongoose");

/**
 * ============================================
 * Student Schema Definition
 * ============================================
 * This schema defines what a "Student" document
 * should look like inside the MongoDB database.
 * 
 * Each property inside the schema has:
 *  - a data type (String, Number, etc.)
 *  - validation rules (required, minlength, max, etc.)
 * 
 * Mongoose uses this schema to enforce structure.
 */
const studentSchema = new mongoose.Schema(
  {
    // --------------------------------------------
    // Student Full Name
    // --------------------------------------------
    name: {
      type: String,
      required: [true, "Please provide a student name"], // Name must be provided
      trim: true, // Removes extra spaces (e.g., " John  Doe " → "John Doe")
      maxlength: [100, "Name cannot exceed 100 characters"], // Max length
    },

    // --------------------------------------------
    // Student Age
    // --------------------------------------------
    age: {
      type: Number,
      required: [true, "Please provide student age"], // Age must be provided
      min: [1, "Age must be at least 1"], // Minimum acceptable age
      max: [120, "Age cannot exceed 120"], // Maximum acceptable age
    },

    // --------------------------------------------
    // Student Department
    // --------------------------------------------
    department: {
      type: String,
      required: [true, "Please provide a department"], // Department is required
      trim: true,
      maxlength: [50, "Department cannot exceed 50 characters"], // Max length
    },
  },

  {
    // --------------------------------------------
    // TIMESTAMPS
    // --------------------------------------------
    // Automatically creates:
    //    createdAt → when document is created
    //    updatedAt → when document is updated
    // --------------------------------------------
    timestamps: true,
  }
);

/**
 * ============================================
 * Create and Export Student Model
 * ============================================
 * 
 * mongoose.model("Student", schema)
 * - "Student" will be the name of the model
 * - MongoDB will auto-create a collection named "students" (lowercase + plural)
 * 
 * Exporting the model allows other files (controller/routes)
 * to interact with the database using this model.
 */
const Student = mongoose.model("Student", studentSchema);

// Export the model using CommonJS
module.exports = Student;
