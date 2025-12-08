# Student CRUD API

A simple REST API built with **Node.js**, **Express**, and **MongoDB** for managing student records.  
This project uses **CommonJS** (`require`) instead of ES modules.

## 📌 Features

- Create, Read, Update, Delete students
- MongoDB + Mongoose
- Express routing
- Morgan request logger
- dotenv for environment variables
- Centralized error handling

---

## 📦 Requirements

I installed these before running:

- Node.js (LTS recommended)
- MongoDB (Atlas cloud)

---

## 🚀 Installation

1. **Install dependencies**

```bash
npm install
```

Installed:

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `morgan` - HTTP request logger
- `dotenv` - Environment variable manager

## Environment Setup

1. **Created a `.env` file:**

```bash
MONGODB_URI=mongodb+srv://username:password@cluster-url/student_db
PORT=5000
```

You can get your MongoDB URI from MongoDB Atlas under "Connect → Drivers".

---

## 🏃 Running the Server

### Development Mode

```
npm run dev
```

The server will start and you'll see:

```
Server running at http://localhost:5000
MongoDB connected to student_db
```

---

## 📡 API Endpoints

### 1. Create a Student

**Endpoint:** `POST /api/students/createStudent`

**Request Body:**

```json
{
"name": "Fredrick Evans",
"age": 29,
"department": "Enigeering"
}
```

**Response (201 Created):**

```json
{
"success": true,
"message": "Student created successfully",
"data": {
"\_id": "6548c3a2e4b0c123456789ab",
"name": "Fredrick Evans",
"age": 29,
"department": "Enigeering",
"createdAt": "2024-01-01T10:00:00.000Z",
"updatedAt": "2024-01-01T10:00:00.000Z"
}
}
```

### 2. Get All Students

**Endpoint:** `GET /api/students/getStudent`

**Query Parameters (optional):**

- `limit` - Number of students to return (default: 10)
- `skip` - Number of students to skip (default: 0)

**Response (200 OK):**

```json
{
"success": true,
"message": "Students retrieved successfully",
"data": [
{
"_id": "6548c3a2e4b0c123456789ab",
"name": "Fredrick Evans",
"age": 29,
"department": "Enigeering",
"createdAt": "2024-01-01T10:00:00.000Z",
"updatedAt": "2024-01-01T10:00:00.000Z"
},
{
"_id": "6548c3a2e4b0c123456789ac",
"name": "Jane Smith",
"age": 21,
"department": "Information Technology",
"createdAt": "2024-01-01T11:00:00.000Z",
"updatedAt": "2024-01-01T11:00:00.000Z"
}
]
}
```

### 3. Get Student by ID

**Endpoint:** `GET /api/students/getStudent/:id`

**Example:** `GET /api/students/getStudent/6548c3a2e4b0c123456789ab`

**Response (200 OK):**

```json
{
"success": true,
"message": "Student retrieved successfully",
"data": {
"_id": "6548c3a2e4b0c123456789ab",
"name": "Fredrick Evans",
"age": 29,
"department": "Enigeering",
"createdAt": "2024-01-01T10:00:00.000Z",
"updatedAt": "2024-01-01T10:00:00.000Z"
}
}
```

### 4. Update a Student

**Endpoint:** `PUT /api/students/updateStudent/:id`

```json
{
"name": "Fredrick Updated",
"age": 30,
"department": "Software Engineering"
}
```

**Response (200 OK):**

```json
{
"success": true,
"message": "Student updated successfully",
"data": {
"_id": "6548c3a2e4b0c123456789ab",
"name": "Fredrick Updated",
"age": 30,
"department": "Software Engineering",
"createdAt": "2024-01-01T10:00:00.000Z",
"updatedAt": "2024-01-01T12:00:00.000Z"
}
}
```

### 5. Delete a Student

**Endpoint:** `DELETE /api/students/deleteStudent/:id`

**Response (200 OK):**

```json
{
"success": true,
"message": "Student deleted successfully",
"data": {
"_id": "6548c3a2e4b0c123456789ab",
"name": "Fredrick Evans",
"age": 29,
"department": "Engineering",
"createdAt": "2024-01-01T10:00:00.000Z",
"updatedAt": "2024-01-01T10:00:00.000Z"
}
}
```

---

## 📁 Project Structure

```
student-api/
├── server.js # Main server file - application entry point
├── package.json # Dependencies and scripts
├── .env.example # Environment variables template
├── .gitignore # Files to ignore in git
├── README.md
│
├── config/
│ └── db.js # MongoDB connection configuration
│
├── models/
│ └── studentModel.js # Mongoose schema for Student
│
├── controllers/
│ └── studentController.js # Business logic for CRUD operations
│
└── routes/
└── studentRoutes.js # API route definitions
```

---

## ❌ Error Handling

The API includes comprehensive error handling for:

### 1. Validation Errors

**Missing Required Fields:**

```json
{
"success": false,
"message": "Please provide name, age, and department"
}
```

**Invalid ID:**

```json
{
"success": false,
"message": "Invalid student ID format"
}
```

### 2. Student Not Found

```json
{
"success": false,
"message": "Student not found"
}
```

### 3. Route Not Found

```json
{
"success": false,
"message": "Route not found",
"path": "/api/invalid-route"
}
```

---

## 📝 License

This project is open source and available under the ISC License.

---

## 🤝 Support

For issues or questions, please check the error messages returned by the API or review the code comments for detailed explanations.
