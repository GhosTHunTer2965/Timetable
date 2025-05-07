import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ code: '', name: '', creditHours: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = () => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:5000/api/courses/${editingId}`, form)
        .then(() => {
          fetchCourses();
          setForm({ code: '', name: '', creditHours: '' });
          setEditingId(null);
        });
    } else {
      axios.post('http://localhost:5000/api/courses', form)
        .then(() => {
          fetchCourses();
          setForm({ code: '', name: '', creditHours: '' });
        });
    }
  };

  const handleEdit = course => {
    setForm({ code: course.code, name: course.name, creditHours: course.creditHours });
    setEditingId(course._id);
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/courses/${id}`)
      .then(() => fetchCourses());
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Courses</h1>

      <form onSubmit={handleSubmit} className="space-y-2 bg-white shadow p-4 rounded mb-6">
        <input type="text" name="code" placeholder="Code" value={form.code} onChange={handleChange}
          className="border p-2 w-full rounded" required />
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange}
          className="border p-2 w-full rounded" required />
        <input type="number" name="creditHours" placeholder="Credit Hours" value={form.creditHours} onChange={handleChange}
          className="border p-2 w-full rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <ul className="space-y-2">
        {courses.map(course => (
          <li key={course._id} className="bg-gray-100 p-4 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{course.code}</div>
              <div>{course.name} ({course.creditHours} credits)</div>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(course)} className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(course._id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
