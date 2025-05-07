import express from "express";
import Semester from "../models/Semester.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const sem = new Semester(req.body);
        const saved = await sem.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    res.json(await Semester.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Semester.findById(req.params.id));
});

router.put("/:id", async (req, res) => {
    res.json(
        await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
});

router.delete("/:id", async (req, res) => {
    await Semester.findByIdAndDelete(req.params.id);
    res.json({ message: "Semester deleted" });
});

export default router;
