import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';

function App() {
  const isAuthenticated = localStorage.getItem('authenticated');
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
          />  
          <Route 
            path="/courses" 
            element={isAuthenticated ? <CourseList /> : <Navigate to="/" />} 
          />
          <Route path="/add-course" element={isAuthenticated ? <AddCourse /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    
  );
}

export default App;
