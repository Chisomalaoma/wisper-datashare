import axios from 'axios';
import { getApiConfig } from '../config/apiConfig';

const config = getApiConfig();

// Create axios instance with base configuration for NestJS backend
export const api = axios.create({
    baseURL: config.BASE_URL,
    headers: config.DEFAULT_HEADERS,
    timeout: config.TIMEOUT,
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('authToken');
            window.location.href = '/auth/login';
        }

        // Handle different types of errors
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
        } else if (!error.response) {
            console.error('Network error:', error);
        } else {
            console.error('API error:', error.response.data);
        }

        return Promise.reject(error);
    }
);

export default api; 