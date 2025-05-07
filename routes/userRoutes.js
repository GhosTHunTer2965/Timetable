import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        const saved = await user.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    res.json(await User.find());
});

router.get("/:id", async (req, res) => {
    res.json(await User.findById(req.params.id));
});

router.put("/:id", async (req, res) => {
    res.json(
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
});

router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

export default router;
