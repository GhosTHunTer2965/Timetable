import express from "express";
import DepartmentCourse from "../models/DepartmentCourse.js";
import DepartmentSemester from "../models/DepartmentSemester.js";

const router = express.Router();

// DeptCourse Routes
router.post("/dept-course", async (req, res) => {
    const entry = new DepartmentCourse(req.body);
    res.status(201).json(await entry.save());
});

router.get("/dept-course", async (req, res) => {
    res.json(await DepartmentCourse.find().populate("department course"));
});

// DeptSemester Routes
router.post("/dept-semester", async (req, res) => {
    const entry = new DepartmentSemester(req.body);
    res.status(201).json(await entry.save());
});

router.get("/dept-semester", async (req, res) => {
    res.json(await DepartmentSemester.find().populate("department semester"));
});

export default router;
