import React, { useEffect, useState,useContext } from "react";
import Layout from './Layout';
import { jwtDecode } from "jwt-decode";
import API from "../utils/axios"; // ✅ using your axios instance
import { FaBook, FaCheckCircle, FaSpinner } from "react-icons/fa";
import MyCourses from "./MyCourses";
import { AuthContext } from "./AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  var username = "User";
  let role = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
        "User";
      role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        "";
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

   const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    inProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/Courses/GetStudentDashboardSummery");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  
   return (
    <Layout>     
     <div style={styles.container}>
      <h2>Welcome, {username} 👋</h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div style={styles.statsContainer}>
          {/* Enrolled */}
          <div style={styles.card}>
            <FaBook size={30} color="#007bff" />
            <h3>{stats.enrolled}</h3>
            <p>Enrolled</p>
          </div>

          {/* Completed */}
          <div style={styles.card}>
            <FaCheckCircle size={30} color="#28a745" />
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>

          {/* In Progress */}
          <div style={styles.card}>
            <FaSpinner size={30} color="#ffc107" />
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
      )}

       <MyCourses />
    </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

export default Dashboard;
