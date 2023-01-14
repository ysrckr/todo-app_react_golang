import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
