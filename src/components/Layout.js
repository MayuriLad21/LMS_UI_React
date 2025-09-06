import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2>VKS LMS</h2>
        <nav>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/courses" style={styles.link}>Course List</Link>
         <Link to="/add-course" style={styles.link}>Add Course</Link>
          <Link to="/studentsList" style={styles.link}>Student List</Link>
        </nav>
      </aside>
      <main style={styles.main}>
        <header style={styles.header}>
         <div></div> 
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{username}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
        </header>
        <div style={styles.content}>
          {children}
        </div>
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
  }
};

export default Layout;
