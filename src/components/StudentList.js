import React, { useEffect, useState } from 'react';
import Layout from './Layout';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Call your FastAPI backend here
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/students'); // <-- your FastAPI URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
 
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Layout>
      <h2>Student List</h2>
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default StudentList;
