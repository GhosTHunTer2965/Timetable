import { useEffect, useState } from "react";
import axios from "axios";

export default function Faculty() {
    const [faculties, setFaculties] = useState([]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        middleInitial: "",
        dateOfJoining: "",
        dob: "",
        designation: "",
        department: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [departments, setDepartments] = useState([]);

    const fetchFaculties = () => {
        axios
            .get("http://localhost:5000/api/faculties")
            .then((res) => setFaculties(res.data))
            .catch((err) => console.error(err));
    };

    const fetchDepartments = () => {
        axios
            .get("http://localhost:5000/api/departments")
            .then((res) => setDepartments(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchFaculties();
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/faculties/${editingId || ""}`;
        const method = editingId ? axios.put : axios.post;

        method(url, form).then(() => {
            fetchFaculties();
            setForm({
                firstName: "",
                lastName: "",
                middleInitial: "",
                dateOfJoining: "",
                dob: "",
                designation: "",
                department: "",
            });
            setEditingId(null);
        });
    };

    const handleEdit = (faculty) => {
        const { _id, ...rest } = faculty;
        setForm(rest);
        setEditingId(_id);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/faculties/${id}`)
            .then(() => fetchFaculties());
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Faculty</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-2 bg-white shadow p-4 rounded mb-6"
            >
                <input
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    name="middleInitial"
                    placeholder="Middle Initial"
                    value={form.middleInitial}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="date"
                    name="dateOfJoining"
                    value={form.dateOfJoining}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    name="designation"
                    placeholder="Designation"
                    value={form.designation}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                            {dept.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update Faculty" : "Add Faculty"}
                </button>
            </form>

            <ul className="space-y-2">
                {faculties.map((f) => (
                    <li
                        key={f._id}
                        className="bg-gray-100 p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <div className="font-semibold">
                                {f.firstName} {f.lastName}
                            </div>
                            <div>
                                Dept: {f.department?.name} | {f.designation}
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(f)}
                                className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(f._id)}
                                className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
