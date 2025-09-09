import React, { useEffect, useState } from "react";
import API from "../utils/axios"; // ✅ use your configured axios.js
import Layout from './Layout';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/Auth/GetStudentProfile"); // ✅ no need to manually add token
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Failed to load profile.</p>;

  return (
    <Layout>
    <div style={styles.container}>
      <h2>👤 User Profile</h2>
      <div style={styles.card}>
        <p><strong>Username:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Contact:</strong> {user.contactNumber}</p>
        <p><strong>Role(s):</strong> {user.roles.join(", ")}</p>
      </div>
    </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};

export default Profile;
