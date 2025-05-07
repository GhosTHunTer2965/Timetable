import { useEffect, useState } from "react";
import axios from "axios";

export default function Semesters() {
    const [semesters, setSemesters] = useState([]);
    const [form, setForm] = useState({ value: "", numStudents: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchSemesters = () => {
        axios
            .get("http://localhost:5000/api/semesters")
            .then((res) => setSemesters(res.data));
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:5000/api/semesters/${editingId}`
            : "http://localhost:5000/api/semesters";

        const req = editingId ? axios.put : axios.post;

        req(url, form).then(() => {
            fetchSemesters();
            setForm({ value: "", numStudents: "" });
            setEditingId(null);
        });
    };

    const handleEdit = (s) => {
        setForm({ value: s.value, numStudents: s.numStudents });
        setEditingId(s._id);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/semesters/${id}`)
            .then(() => fetchSemesters());
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Semesters</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-2 bg-white shadow p-4 rounded mb-6"
            >
                <select
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
                <input
                    name="numStudents"
                    placeholder="Number of Students"
                    value={form.numStudents}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update Semester" : "Add Semester"}
                </button>
            </form>

            <ul className="space-y-2">
                {semesters.map((s) => (
                    <li
                        key={s._id}
                        className="bg-gray-100 p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <div className="font-semibold">
                                Semester {s.value}
                            </div>
                            <div>{s.numStudents} students</div>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(s)}
                                className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(s._id)}
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
