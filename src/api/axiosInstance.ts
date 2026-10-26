import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

// Automatically inject JWT Bearer token if present in storage
axiosInstance.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('ila_auth_access_token');
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // Storage unavailable
    }
    return config;
});

export default axiosInstance;

