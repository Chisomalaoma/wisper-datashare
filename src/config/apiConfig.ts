// API Configuration
export const API_CONFIG = {
    // Base URL for the NestJS backend
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',

    // Default headers
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

    // Timeout settings
    TIMEOUT: 30000, // 30 seconds

    // Endpoints
    ENDPOINTS: {
        AUTH: {
            REQUEST_OTP: '/auth/request-otp',
            VERIFY_KYC:'/qoreid/nin',
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
            VERIFY_OTP: '/auth/verify-otp',
        },
        USER: {
            PROFILE: '/users/profile',
            UPDATE: '/user/update',
        },
        DATAPLAN: {
            GET: '/allocate/data-plans',
        },
    },

    // Error messages
    ERROR_MESSAGES: {
        NETWORK_ERROR: 'Network error. Please check your connection.',
        TIMEOUT_ERROR: 'Request timeout. Please try again.',
        SERVER_ERROR: 'Server error. Please try again later.',
        UNAUTHORIZED: 'Unauthorized. Please login again.',
    },
};

// Environment-specific configurations
export const getApiConfig = () => {
    const env = process.env.NODE_ENV;

    switch (env) {
        case 'production':
            return {
                ...API_CONFIG,
                BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com/api',
            };
        case 'development':
            return {
                ...API_CONFIG,
                BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
            };
        default:
            return API_CONFIG;
    }
}; 