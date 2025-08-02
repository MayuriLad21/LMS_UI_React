import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      instructor,
      duration
    };

    fetch('http://localhost:5000/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCourse)
    })
      .then(() => {
        alert('Course added!');
        navigate('/courses'); // redirect to course list
      });
  };

  return (
    <Layout>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label><br />
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Instructor:</label><br />
          <input type="text" value={instructor} onChange={e => setInstructor(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Duration:</label><br />
          <input type="text" value={duration} onChange={e => setDuration(e.target.value)} required />
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none' }}>
          Add Course
        </button>
      </form>
    </Layout>
  );
};

export default AddCourse;
