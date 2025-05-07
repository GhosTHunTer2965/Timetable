import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const { pathname } = useLocation();

    const navItems = [
        { path: "/", label: "Dashboard" },
        { path: "/users", label: "Users" },
        { path: "/faculties", label: "Faculties" },
        { path: "/courses", label: "Courses" },
        { path: "/departments", label: "Departments" },
        { path: "/rooms", label: "Rooms" },
        { path: "/semesters", label: "Semesters" },
    ];

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 shadow">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="text-lg font-bold">TimeTable Admin</div>
                <div className="flex space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-3 py-2 rounded hover:bg-blue-700 transition ${
                                pathname === item.path ? "bg-blue-800" : ""
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
