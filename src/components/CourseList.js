import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";
import Layout from "./Layout";
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("/Courses/AllCourses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    // later call API: POST /Courses/Enroll/{courseId}
    alert(`Enrolled in course ID: ${courseId}`);
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <Layout>
    <div style={styles.container}>
      <h1 style={styles.title}>Available Courses</h1>
      <div style={styles.grid}>
        {courses.map((course) => (
          <div key={course.courseId} style={styles.card}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>
              <b>Instructor:</b> {course.instructorName}
            </p>
            <p>
              <b>Duration:</b> {course.duration} hrs
            </p>
            <p>
              <b>Fees:</b> ${course.fees}
            </p>

            <div style={styles.actions}>
              <Link to={`/course/${course.courseId}`} style={styles.link}>
                View Details
              </Link>
              <button
                style={styles.enrollBtn}
                onClick={() => handleEnroll(course.courseId)}
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

const styles = {
  container: { padding: "20px" },
  title: { fontSize: "26px", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  enrollBtn: {
    padding: "6px 12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
  },
};

export default CourseList;
