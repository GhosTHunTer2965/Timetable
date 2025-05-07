import mongoose from "mongoose";

const deptCourseSchema = new mongoose.Schema({
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

export default mongoose.model("DepartmentCourse", deptCourseSchema);
