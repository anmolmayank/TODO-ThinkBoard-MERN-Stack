import axios, { type AxiosResponse } from 'axios';

// Create an axios instance with defaults
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // import.meta.env.MODE , Adjust baseURL as needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Example: attach token if available
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
