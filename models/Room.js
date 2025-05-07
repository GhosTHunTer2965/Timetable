import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    type: { type: Number, enum: [1, 2, 3], required: true }, // 1: Classroom, 2: Lab, 3: Both
    number: { type: String, unique: true, required: true },
    capacity: Number,
});

export default mongoose.model("Room", roomSchema);
