// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt_decode(token);
        const expiryTime = decoded.exp * 1000; // ms
        const currentTime = Date.now();

        if (expiryTime <= currentTime) {
          handleLogout();
        } else {
          setUser(decoded);

          // schedule auto logout
          const timeout = expiryTime - currentTime;
          const timer = setTimeout(() => {
            handleLogout();
          }, timeout);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwt_decode(token);
    setUser(decoded);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
