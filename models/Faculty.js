import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    middleInitial: String,
    dateOfJoining: { type: Date, required: true },
    dob: { type: Date, required: true },
    designation: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    lectureHours: { type: Number, default: 0 },
    labHours: { type: Number, default: 0 },
});

export default mongoose.model("Faculty", facultySchema);
