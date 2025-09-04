import axios, { type AxiosResponse } from 'axios';

// Create an axios instance with defaults
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // import.meta.env.MODE , Adjust baseURL as needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 🔥 Add Authorization header automatically before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('accessToken') ??
      localStorage.getItem('refreshToken'); // make sure you use the correct key
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token on 401
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // call /refresh endpoint, refresh token is sent automatically via cookie
        const response = await axiosInstance.post('/auth/refresh');
        const newToken = response.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // retry original request
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // redirect to login on refresh failure
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
