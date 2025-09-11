import axios from "axios";

// base URL for your backend
const API = axios.create({
baseURL: "https://localhost:7098/api"
//baseURL: process.env.REACT_APP_API_URL ,
//baseURL: "https://vks-lms-api-cfaubjg4emfme8f4.centralindia-01.azurewebsites.net/api"
});
//console.log("Loaded API URL:", process.env.REACT_APP_API_URL);
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
