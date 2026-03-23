// src/api/api.js//攔截
import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
api.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];

    if (token) {
        config.headers.Authorization = token;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
export default api;