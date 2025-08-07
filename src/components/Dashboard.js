// Dashboard.js
import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard/')
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        return response.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  return (
    <Layout>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Summary Cards */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div><strong>Total Courses:</strong> {data.total_courses}</div>
            <div><strong>Total Students:</strong> {data.total_students}</div>
            <div><strong>Active Users Today:</strong> {data.active_users_today}</div>
          </div>

          {/* New Registrations Line Chart */}
          <h3>New User Registrations (Last 5 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.new_registrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          {/* Top Courses Bar Chart */}
          <h3 style={{ marginTop: '40px' }}>Top Enrolled Courses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.top_courses} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="enrollments" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
