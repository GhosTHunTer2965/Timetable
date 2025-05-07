import { useEffect, useState } from "react";
import axios from "axios";

export default function TimetableSemester() {
    const [timetable, setTimetable] = useState({});
    const [semesterIds, setSemesterIds] = useState([]);

    useEffect(() => {
        axios
            .post("http://localhost:5000/api/timetable/generate")
            .then((res) => {
                setTimetable(res.data.timetable);
                setSemesterIds(Object.keys(res.data.timetable));
            })
            .catch((err) => console.error(err));
    }, []);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const timeSlots = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:15",
        "14:15",
        "15:15",
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Semester Timetables</h1>
            {semesterIds.map((semId) => (
                <div key={semId} className="mb-10">
                    <h2 className="text-xl font-semibold mb-2">
                        Semester ID: {semId}
                    </h2>
                    <div className="overflow-x-auto border rounded">
                        <table className="table-auto w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="border p-2">Day / Time</th>
                                    {timeSlots.map((time) => (
                                        <th key={time} className="border p-2">
                                            {time}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {days.map((day) => (
                                    <tr key={day}>
                                        <td className="border p-2 font-semibold">
                                            {day}
                                        </td>
                                        {timeSlots.map((_, i) => {
                                            const slot =
                                                timetable[semId]?.[day]?.[i];
                                            return (
                                                <td
                                                    key={i}
                                                    className="border p-2 text-center"
                                                >
                                                    {slot ? (
                                                        <>
                                                            <div>
                                                                {slot.course}
                                                            </div>
                                                            <div className="text-xs">
                                                                {slot.faculty}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {slot.room}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        "—"
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
