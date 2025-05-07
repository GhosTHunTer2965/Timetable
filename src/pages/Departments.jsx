import { useEffect, useState } from "react";
import axios from "axios";

export default function Department() {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ name: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchDepartments = () => {
        axios
            .get("http://localhost:5000/api/departments")
            .then((res) => setDepartments(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        setForm({ name: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/departments/${editingId || ""}`;
        const method = editingId ? axios.put : axios.post;

        method(url, form).then(() => {
            fetchDepartments();
            setForm({ name: "" });
            setEditingId(null);
        });
    };

    const handleEdit = (dept) => {
        setForm({ name: dept.name });
        setEditingId(dept._id);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/departments/${id}`)
            .then(() => fetchDepartments());
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Departments</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-2 bg-white shadow p-4 rounded mb-6"
            >
                <input
                    type="text"
                    placeholder="Department Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update Department" : "Add Department"}
                </button>
            </form>

            <ul className="space-y-2">
                {departments.map((dept) => (
                    <li
                        key={dept._id}
                        className="bg-gray-100 p-4 rounded flex justify-between items-center"
                    >
                        <div className="font-semibold">{dept.name}</div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(dept)}
                                className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(dept._id)}
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
