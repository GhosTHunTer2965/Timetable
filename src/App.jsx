import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Faculties from "./pages/Faculties";
import Courses from "./pages/Courses";
import Departments from "./pages/Departments";
import Rooms from "./pages/Rooms";
import Semesters from "./pages/Semesters";
import TimetableSemester from "./pages/TimetableSemester";
import TimetableFaculty from "./pages/TimetableFaculty";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/timetablesem" element={<TimetableSemester />} />
                <Route path="/timetablefac" element={<TimetableFaculty />} />
                <Route path="/users" element={<Users />} />
                <Route path="/faculties" element={<Faculties />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/semesters" element={<Semesters />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
