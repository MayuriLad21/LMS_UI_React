import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://localhost:7098/api/Auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Save JWT token
        localStorage.setItem("token", response.data.token);

        // Optionally save role if API returns it
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // Redirect to Dashboard
        navigate("/dashboard");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
   
     <div style={styles.wrapper}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login to LMS</h2>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
        <div className="flex justify-between text-sm mt-4">
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      </form>
      
    </div>


  );
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f2f5'
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    border: 'none',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
