import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        role: "",
        email: "",
        password: "",
        mobile: "",
    });
    const [editingId, setEditingId] = useState(null);

    const fetchUsers = () => {
        axios
            .get("http://localhost:5000/api/users")
            .then((res) => setUsers(res.data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:5000/api/users/${editingId}`
            : "http://localhost:5000/api/users";

        const req = editingId ? axios.put : axios.post;

        req(url, form).then(() => {
            fetchUsers();
            setForm({ role: "", email: "", password: "", mobile: "" });
            setEditingId(null);
        });
    };

    const handleEdit = (u) => {
        setForm({
            role: u.role,
            email: u.email,
            password: u.password,
            mobile: u.mobile,
        });
        setEditingId(u._id);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/users/${id}`)
            .then(() => fetchUsers());
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Users</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-2 bg-white shadow p-4 rounded mb-6"
            >
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                >
                    <option value="">Select Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Faculty</option>
                </select>
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    name="mobile"
                    placeholder="Mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update User" : "Add User"}
                </button>
            </form>

            <ul className="space-y-2">
                {users.map((u) => (
                    <li
                        key={u._id}
                        className="bg-gray-100 p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <div className="font-semibold">{u.email}</div>
                            <div>
                                Role: {u.role === 1 ? "Admin" : "Faculty"}
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(u)}
                                className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(u._id)}
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
