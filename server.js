import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import route handlers (ES6 style)
import userRoutes from "./routes/userRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import semesterRoutes from "./routes/semesterRoutes.js";
import joinRoutes from "./routes/joinRoutes.js";
import timetableRoutes from "./routes/timetable.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Use imported routes
app.use("/api/users", userRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/joins", joinRoutes); // DeptCourse & DeptSemester

app.use("/api/timetable", timetableRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
