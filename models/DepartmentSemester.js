import mongoose from "mongoose";

const deptSemesterSchema = new mongoose.Schema({
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
});

export default mongoose.model("DepartmentSemester", deptSemesterSchema);
