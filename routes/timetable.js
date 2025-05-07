import express from "express";
import Faculty from "../models/Faculty.js";
import Course from "../models/Course.js";
import Room from "../models/Room.js";
import Semester from "../models/Semester.js";
import DepartmentSemester from "../models/DepartmentSemester.js";
import DepartmentCourse from "../models/DepartmentCourse.js";

const router = express.Router();

// Dummy in-memory grid for now (Mon-Fri, 9–4:30 split into 55-minute blocks)
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIME_SLOTS = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:15",
    "14:15",
    "15:15",
]; // 55 min + lunch at 12:00–13:00

router.post("/generate", async (req, res) => {
    try {
        const semestersToSchedule = [1, 3, 5, 7]; // or [2, 4, 6, 8]
        const facultyList = await Faculty.find().populate("department");
        const rooms = await Room.find();
        const semesters = await Semester.find({
            value: { $in: semestersToSchedule },
        });
        const deptSemesters = await DepartmentSemester.find().populate(
            "department semester"
        );
        const deptCourses = await DepartmentCourse.find().populate(
            "department course"
        );

        const timetable = {}; // { semesterId: { [day]: [slots] } }
        const facultyAvailability = {}; // [facultyId][day][slot] = true/false
        const roomAvailability = {}; // [roomId][day][slot] = true/false

        // Init blank timetable per semester
        semesters.forEach((sem) => {
            timetable[sem._id] = {};
            DAYS.forEach((day) => {
                timetable[sem._id][day] = Array(TIME_SLOTS.length).fill(null);
            });
        });

        // Init availability maps
        facultyList.forEach((f) => {
            facultyAvailability[f._id] = {};
            DAYS.forEach((day) => {
                facultyAvailability[f._id][day] = Array(TIME_SLOTS.length).fill(
                    false
                );
            });
        });
        rooms.forEach((r) => {
            roomAvailability[r._id] = {};
            DAYS.forEach((day) => {
                roomAvailability[r._id][day] = Array(TIME_SLOTS.length).fill(
                    false
                );
            });
        });

        for (const sem of semesters) {
            const deptIds = deptSemesters
                .filter(
                    (ds) => ds.semester._id.toString() === sem._id.toString()
                )
                .map((ds) => ds.department._id.toString());

            const courses = deptCourses
                .filter((dc) => deptIds.includes(dc.department._id.toString()))
                .map((dc) => dc.course);

            for (const course of courses) {
                // Find a faculty to assign (we'll later use preferences)
                const assignedFaculty = facultyList.find(
                    (f) => f.lectureHours > 0
                ); // 🔄 Replace with preference logic
                if (!assignedFaculty) continue;

                // Find suitable room
                const suitableRoom = rooms.find(
                    (r) => r.type === 1 || r.type === 3
                ); // Assuming theory

                if (!suitableRoom) continue;

                // Allocate a free slot
                outer: for (const day of DAYS) {
                    for (let i = 0; i < TIME_SLOTS.length; i++) {
                        const isSlotFree =
                            !facultyAvailability[assignedFaculty._id][day][i] &&
                            !roomAvailability[suitableRoom._id][day][i] &&
                            !timetable[sem._id][day][i];

                        if (isSlotFree && TIME_SLOTS[i] !== "12:00") {
                            // Assign slot
                            timetable[sem._id][day][i] = {
                                course: course.name,
                                faculty: assignedFaculty.firstName,
                                room: suitableRoom.number,
                            };

                            // Mark as used
                            facultyAvailability[assignedFaculty._id][day][
                                i
                            ] = true;
                            roomAvailability[suitableRoom._id][day][i] = true;

                            // Reduce lecture hours
                            assignedFaculty.lectureHours -= 1;

                            break outer;
                        }
                    }
                }
            }
        }

        res.json({ message: "Semester-wise timetable generated", timetable });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error generating timetable" });
    }
});

export default router;
