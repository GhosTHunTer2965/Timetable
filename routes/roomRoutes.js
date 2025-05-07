import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const room = new Room(req.body);
        const saved = await room.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    res.json(await Room.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Room.findById(req.params.id));
});

router.put("/:id", async (req, res) => {
    res.json(
        await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
});

router.delete("/:id", async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
});

export default router;
