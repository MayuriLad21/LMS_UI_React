import React, { useEffect, useState } from 'react';
import Layout from './Layout';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDummyCourses = fetch('https://dummyjson.com/products?limit=10').then(res => res.json());
    const fetchLocalCourses = fetch('http://localhost:5000/courses').then(res => res.json());

    Promise.all([fetchDummyCourses, fetchLocalCourses])
      .then(([dummyData, localData]) => {
        // Normalize both datasets
        const dummyCourses = dummyData.products.map(item => ({
          id: `dummy-${item.id}`,
          title: item.title,
          description: item.description,
          price: item.price
        }));

        const localCourses = localData.map(item => ({
          id: `local-${item.id}`,
          title: item.title,
          description: `${item.instructor} - ${item.duration}`,
          price: 0
        }));

        setCourses([...localCourses, ...dummyCourses]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h2>Course List (Merged Local + Dummy)</h2>
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.description?.slice(0, 60)}...</td>
                <td>{course.price === 0 ? 'Free' : `$${course.price}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default CourseList;
