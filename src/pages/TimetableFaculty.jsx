export default function TimetableFaculty({ facultySchedule }) {
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
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Timetable</h1>
            <div className="overflow-x-auto border rounded">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border p-2">Day / Time</th>
                            {timeSlots.map((t) => (
                                <th key={t} className="border p-2">
                                    {t}
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
                                    const slot = facultySchedule?.[day]?.[i];
                                    return (
                                        <td
                                            key={i}
                                            className="border p-2 text-center"
                                        >
                                            {slot ? (
                                                <>
                                                    <div>{slot.course}</div>
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
    );
}
