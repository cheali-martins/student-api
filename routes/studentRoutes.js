// ============================================
// Student Routes - Custom Named Endpoints
// ============================================

const express = require("express");

// Import controller functions
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Create router
const router = express.Router();

/**
 * Route: POST /api/createStudent
 * Description: Create a new student
 */
router.post("/createStudent", createStudent);

/**
 * Route: GET /api/getStudent
 * Description: Get ALL students
 */
router.get("/getStudent", getAllStudents);

/**
 * Route: GET /api/getStudent/:id
 * Description: Get ONE student by ID
 */
router.get("/getStudent/:id", getStudentById);

/**
 * Route: PUT /api/updateStudent/:id
 * Description: Update a student by ID
 */
router.put("/updateStudent/:id", updateStudent);

/**
 * Route: DELETE /api/deleteStudent/:id
 * Description: Delete a student by ID
 */
router.delete("/deleteStudent/:id", deleteStudent);

// Export router
module.exports = router;
