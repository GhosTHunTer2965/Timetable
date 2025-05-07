import express from "express";
import Department from "../models/Department.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const dept = new Department(req.body);
        const saved = await dept.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    res.json(await Department.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Department.findById(req.params.id));
});

router.put("/:id", async (req, res) => {
    res.json(
        await Department.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
    );
});

router.delete("/:id", async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
});

export default router;
