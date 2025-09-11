import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);



  const user = JSON.parse(localStorage.getItem("user")) || {
    userName: "User",
    email: "user@example.com"
   
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  };

  

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2>VKs LMS</h2>
        <nav>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/courses" style={styles.link}>Course List</Link>
         <Link to="/add-course" style={styles.link}>Add Course</Link>
          <Link to="/studentsList" style={styles.link}>Student List</Link>
        </nav>
      </aside>
     <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div></div>
          <div style={{ position: "relative" }}>
            {/* User Icon */}
            <FaUserCircle
              size={32}
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div style={styles.dropdown}>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {user.userName}
                </p>
                <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                  {user.email}
                </p>
                <hr />
                <button
                  style={styles.dropdownButton}
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}>
                  View Profile
                </button>
                <button
                  style={{ ...styles.dropdownButton, color: "red" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh'
  },
 sidebar: {
  width: '200px',
  background: '#343a40',
  color: '#fff',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxSizing: 'border-box'
},
  link: {
  color: '#fff',
  textDecoration: 'none',
  display: 'block',
  margin: '10px 0'
},
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
  background: '#f8f9fa',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
  width: '100%',
  boxSizing: 'border-box'
},
  logoutButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  content: {
    padding: '20px'
  },
   dropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px 15px",
    width: "200px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  dropdownButton: {
    background: "none",
    border: "none",
    textAlign: "left",
    width: "100%",
    padding: "8px 0",
    cursor: "pointer",
    fontSize: "14px",
  }
};

export default Layout;
