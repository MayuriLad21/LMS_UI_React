import axios from "axios";

// base URL for your backend
const API = axios.create({
  baseURL: "https://localhost:7098/api",
});

// ✅ Interceptor: attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
