import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import StudentList from './components/StudentList'; 
import Profile from "./components/Profile";
import CourseDetails from "./components/CourseDetails";
import Registeruser from './components/Register';
import { AuthProvider } from "./components/AuthContext";

function App() {
  const isAuthenticated = localStorage.getItem('token') ? true : false;


  return (
    
      <Router>
         <AuthProvider> 
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
           <Route path="/profile"  element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path="/add-course" element={isAuthenticated ? <AddCourse /> : <Navigate to="/" />} />
          <Route path="/studentsList" element={isAuthenticated ? <StudentList /> : <Navigate to="/" />} />
          <Route path="/course/:id" element={isAuthenticated ? <CourseDetails /> : <Navigate to="/" />} />
          <Route path="/register" element={<Registeruser />} />
        </Routes>
        </AuthProvider>
      </Router>
    
  );
}

export default App;
