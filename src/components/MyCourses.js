// src/components/MyCourses.js
import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("/Courses/GetStudentEnrolledCourses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div style={styles.container}>
      <h3>My Courses</h3>
      {courses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <>
          <ul style={styles.courseList}>
            {courses.slice(0, 3).map((course) => (
              <li key={course.courseId} style={styles.courseItem}>
                <div>
                    <Link to={`/course/${course.courseId}`} style={styles.courseLink}>
                     <strong>{course.title}</strong>
                    </Link>
                  <p style={styles.description}>{course.description}</p>
                  <p>
                    Status: <b>{course.completionStatus}</b> | Grade:{" "}
                    <b>{course.grade}</b>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {/* <Link to="/courses" style={styles.viewAllBtn}>
            View All Courses
          </Link> */}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  courseList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  courseItem: {
    borderBottom: "1px solid #eee",
    padding: "10px 0",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
  viewAllBtn: {
    display: "inline-block",
    marginTop: "15px",
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
  },
  courseLink: {
  color: "#007bff",
  textDecoration: "none",
},
};

export default MyCourses;
