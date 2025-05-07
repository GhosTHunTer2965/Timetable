import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="max-w-xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <ul className="space-y-4">
                {[
                    { path: "/timetablesem", label: "TimeTable Semester" },
                    { path: "/timetablefac", label: "TimeTable Faculty" },
                    { path: "/courses", label: "Manage Courses" },
                    { path: "/faculties", label: "Manage Faculties" },
                    { path: "/departments", label: "Manage Departments" },
                    { path: "/rooms", label: "Manage Rooms" },
                    { path: "/semesters", label: "Manage Semesters" },
                    { path: "/users", label: "Manage Users" },
                ].map(({ path, label }) => (
                    <li key={path}>
                        <Link
                            to={path}
                            className="block bg-blue-600 text-white p-3 rounded hover:bg-blue-700 text-center"
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
