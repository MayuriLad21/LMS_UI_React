import React, { useEffect, useState } from 'react';
import Layout from './Layout';

const initialForm = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  age: '',
  gender: ''
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/students');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
    setLoading(false);
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Edit student
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/api/students/${editingId}`
      : 'http://localhost:8000/api/students';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      fetchStudents();
      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);
    }
  };

  // Edit button
  const handleEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
    setShowForm(true);
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    const response = await fetch(`http://localhost:8000/api/students/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) fetchStudents();
  };

  // Add button
  const handleAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <Layout>
      <h2>Student List</h2>
      <button onClick={handleAdd} style={{ marginBottom: 16, background: '#4fc3f7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>
        Add Student
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 12, background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required style={{ flex: '1 1 120px', padding: 8 }} />
          <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required style={{ flex: '1 1 120px', padding: 8 }} />
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ flex: '1 1 120px', padding: 8 }} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ flex: '1 1 180px', padding: 8 }} />
          <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} required style={{ flex: '1 1 60px', padding: 8 }} />
          <select name="gender" value={form.gender} onChange={handleChange} required style={{ flex: '1 1 100px', padding: 8 }}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>
            {editingId ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>
            Cancel
          </button>
        </form>
      )}
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: 600
          }}>
            <thead style={{ background: '#4fc3f7', color: '#fff' }}>
              <tr>
                 <th style={{ padding: 8 }}>Username</th>
                <th style={{ padding: 8 }}>First Name</th>
                <th style={{ padding: 8 }}>Last Name</th>
                <th style={{ padding: 8 }}>Email</th>
                <th style={{ padding: 8 }}>Age</th>
                <th style={{ padding: 8 }}>Gender</th>
                <th style={{ padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 8 }}>{student.username}</td>
                  <td style={{ padding: 8 }}>{student.first_name}</td>
                  <td style={{ padding: 8 }}>{student.last_name}</td> 
                  <td style={{ padding: 8 }}>{student.email}</td>
                  <td style={{ padding: 8 }}>{student.age}</td>
                  <td style={{ padding: 8 }}>{student.gender}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleEdit(student)} style={{ marginRight: 8, background: '#ffc107', color: '#333', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(student.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default StudentList;