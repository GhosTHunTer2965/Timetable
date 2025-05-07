import { useEffect, useState } from "react";
import axios from "axios";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({ type: "", number: "", capacity: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchRooms = () => {
        axios
            .get("http://localhost:5000/api/rooms")
            .then((res) => setRooms(res.data));
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:5000/api/rooms/${editingId}`
            : "http://localhost:5000/api/rooms";

        const req = editingId ? axios.put : axios.post;

        req(url, form).then(() => {
            fetchRooms();
            setForm({ type: "", number: "", capacity: "" });
            setEditingId(null);
        });
    };

    const handleEdit = (r) => {
        setForm({ type: r.type, number: r.number, capacity: r.capacity });
        setEditingId(r._id);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/rooms/${id}`)
            .then(() => fetchRooms());
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Rooms</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-2 bg-white shadow p-4 rounded mb-6"
            >
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                >
                    <option value="">Select Type</option>
                    <option value="1">Classroom</option>
                    <option value="2">Lab</option>
                    <option value="3">Both</option>
                </select>
                <input
                    name="number"
                    placeholder="Room Number"
                    value={form.number}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    name="capacity"
                    placeholder="Capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update Room" : "Add Room"}
                </button>
            </form>

            <ul className="space-y-2">
                {rooms.map((r) => (
                    <li
                        key={r._id}
                        className="bg-gray-100 p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <div className="font-semibold">Room {r.number}</div>
                            <div>
                                Type: {["Classroom", "Lab", "Both"][r.type - 1]}{" "}
                                — Capacity: {r.capacity}
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(r)}
                                className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(r._id)}
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
