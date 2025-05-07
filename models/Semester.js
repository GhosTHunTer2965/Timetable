import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
    value: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8], required: true },
    numStudents: Number,
});

export default mongoose.model("Semester", semesterSchema);
