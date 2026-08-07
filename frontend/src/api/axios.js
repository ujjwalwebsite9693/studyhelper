import axios from 'axios';

// In production, set VITE_API_URL in Vercel's project env vars to your
// Render backend URL, e.g. https://sbte-portal-backend.onrender.com
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Two separate instances so a student token never leaks onto an admin
// request or vice versa.
export const studentApi = axios.create({ baseURL: `${baseURL}/api` });
export const adminApi = axios.create({ baseURL: `${baseURL}/api` });

studentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('studentToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default studentApi;
