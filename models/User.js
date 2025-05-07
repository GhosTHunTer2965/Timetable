import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: { type: Number, enum: [1, 2], required: true }, // 1: Admin, 2: Faculty
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
});

export default mongoose.model("User", userSchema);
