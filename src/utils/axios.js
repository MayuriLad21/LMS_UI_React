import axios from "axios";

// base URL for your backend
const API = axios.create({

  baseURL: "https://vks-lms-api-cfaubjg4emfme8f4.centralindia-01.azurewebsites.net/api",

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
