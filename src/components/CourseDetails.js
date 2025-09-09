import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/axios";
import Layout from './Layout';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await API.get(`/Courses/GetCourseDetails/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
     <Layout> 
    <div style={styles.container}>
      {/* Breadcrumb */}
      <nav style={styles.breadcrumb}>
        <Link to="/dashboard" style={styles.breadcrumbLink}>
          Dashboard
        </Link>{" "}
        ›{" "}
        <Link to="/courses" style={styles.breadcrumbLink}>
          My Courses
        </Link>{" "}
        › <span>{course.title}</span>
      </nav>

      {/* Course Title */}
      <h1 style={styles.title}>{course.title}</h1>

      {/* Course Player (dummy) */}
      <div style={styles.player}>
        <p>🎬 Course Player Placeholder</p>
        <button style={styles.startBtn}>▶ Start / Continue Course</button>
      </div>

      {/* Course Info */}
      <div style={styles.section}>
        <h3>About this course</h3>
        <p>{course.description}</p>
        <p>
          <b>Duration:</b> {course.duration} hrs
        </p>
        <p>
          <b>Fees:</b> ${course.fees}
        </p>
      </div>

      {/* Instructor */}
      <div style={styles.card}>
        <h3>Instructor</h3>
        <p>
          {course.instructor.firstName} {course.instructor.lastName}
        </p>
        <p>{course.instructor.email}</p>
      </div>

      {/* Enrolled Students */}
      {/* <div style={styles.section}>
        <h3>Enrolled Students</h3>
        {course.enrolledStudents && course.enrolledStudents.length > 0 ? (
          <ul style={styles.studentList}>
            {course.enrolledStudents.map((student) => (
              <li key={student.id} style={styles.studentItem}>
                {student.firstName} {student.lastName} | Status:{" "}
                {student.completionStatus} | Grade: {student.grade}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students enrolled yet.</p>
        )}
      </div> */}
    </div>
     </Layout> 
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  breadcrumb: {
    marginBottom: "15px",
    fontSize: "14px",
    color: "#555",
  },
  breadcrumbLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  player: {
    background: "#000",
    color: "#fff",
    height: "250px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  startBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  section: {
    marginBottom: "30px",
  },
  card: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "30px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  studentList: {
    listStyle: "none",
    padding: 0,
  },
  studentItem: {
    borderBottom: "1px solid #eee",
    padding: "8px 0",
  },
};

export default CourseDetails;
