import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const course = new Course(req.body);
        const saved = await course.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    res.json(await Course.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Course.findById(req.params.id));
});

router.put("/:id", async (req, res) => {
    res.json(
        await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
});

router.delete("/:id", async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
});

export default router;
