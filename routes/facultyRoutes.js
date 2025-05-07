import express from "express";
import Faculty from "../models/Faculty.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const faculty = new Faculty(req.body);
        const saved = await faculty.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    res.json(await Faculty.find().populate("department"));
});

router.get("/:id", async (req, res) => {
    res.json(await Faculty.findById(req.params.id).populate("department"));
});

router.put("/:id", async (req, res) => {
    res.json(
        await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
});

router.delete("/:id", async (req, res) => {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
});

export default router;
