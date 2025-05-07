import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    creditHours: Number,
});

export default mongoose.model("Course", courseSchema);
