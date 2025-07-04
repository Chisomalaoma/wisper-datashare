import { defaultClient } from '../utils/axiosClient';
import { API_CONFIG } from '../config/apiConfig';

export interface RequestOTPRequest {
    nin: string;
    phone: string;
}

export interface RequestOTPResponse {
    success: boolean;
    message: string;
    requestId?: string;
    otpSent?: boolean;
}

export interface RegisterRequest {
    firstName: string;
    surname: string;
    phone: string;
    school: string;
    matric: string;
    nin: string;
    email: string;
    password: string;
    requestId?: string;
    otp?: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        firstName: string;
        surname: string;
        phone: string;
        email: string;
    };
    token?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        firstName: string;
        surname: string;
        email: string;
        phone: string;
        school: string;
        matric: string;
        nin: string;
    };
}

// Request OTP for NIN verification
export const requestOTP = async (data: RequestOTPRequest): Promise<RequestOTPResponse> => {
    return defaultClient.post<RequestOTPResponse>(API_CONFIG.ENDPOINTS.AUTH.REQUEST_OTP, data);
};

// Register user with OTP verification
export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    return defaultClient.post<RegisterResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data);
};

// Login user
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    return defaultClient.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, data);
};

// Create a custom client with different configuration
export const createCustomClient = (config: {
    baseURL: string;
    headers?: Record<string, string>;
    timeout?: number;
}) => {
    const { AxiosClient } = require('../utils/axiosClient');
    return new AxiosClient(config);
}; 