// ============================================
// Student Controller - Business Logic Functions
// ============================================

// Import the Student model using CommonJS
const Student = require("../models/studentModel");

/**
 * ============================================
 * CREATE STUDENT
 * Route: POST /api/students
 * Description: Add a new student to the database
 * ============================================
 */
const createStudent = async (req, res, next) => {
  try {
    // Extract fields from request body
    const { name, age, department } = req.body;

    // Basic validation: ensure all required fields exist
    if (!name || !age || !department) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, age, and department",
      });
    }

    // Age must be valid number
    if (isNaN(age) || age <= 0) {
      return res.status(400).json({
        success: false,
        message: "Age must be a valid positive number",
      });
    }

    // Create the student in MongoDB
    const newStudent = await Student.create({
      name,
      age,
      department,
    });

    // Response back to client
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (error) {
    // Handle Mongoose validation errors (from schema)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    // Pass any other errors to global error handler
    next(error);
  }
};

/**
 * ============================================
 * GET ALL STUDENTS
 * Route: GET /api/students
 * Description: Fetch all students (with optional pagination)
 * ============================================
 */
const getAllStudents = async (req, res, next) => {
  try {
    // Optional query parameters for pagination
    
    // This tells MongoDB how many students to return in one request. Default: 10
    const limit = parseInt(req.query.limit) || 10;    

// This tells MongoDB how many students to skip before returning results.
// Used for pagination like:
// Page 1 → skip 0
// Page 2 → skip 10
// Page 3 → skip 20

    const skip = parseInt(req.query.skip) || 0;

    // Fetch students from DB
    const students = await Student.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(limit)
      .skip(skip);

    // Count total students
    const totalCount = await Student.countDocuments();

    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      count: students.length,
      totalCount,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ============================================
 * GET STUDENT BY ID
 * Route: GET /api/students/:id
 * Description: Fetch single student details
 * ============================================
 */
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    // Find student
    const student = await Student.findById(id);

    // If not found
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ============================================
 * UPDATE STUDENT
 * Route: PUT /api/students/:id
 * Description: Update a student's info
 * ============================================
 */
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    // Extract fields to update
    const { name, age, department } = req.body;

    // Ensure at least one field is provided
    if (!name && !age && !department) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // Validate age if provided
    if (age !== undefined && (isNaN(age) || age <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Age must be a valid positive number",
      });
    }

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (department) updateData.department = department;

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated version
      runValidators: true, // apply schema validators
    });

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    next(error);
  }
};

/**
 * ============================================
 * DELETE STUDENT
 * Route: DELETE /api/students/:id
 * Description: Remove a student from DB
 * ============================================
 */
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    // Delete student
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deletedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// Export all controller functions (CommonJS)
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
