import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/apiConfig';

export interface AxiosClientConfig {
    baseURL: string;
    headers?: Record<string, string>;
    timeout?: number;
    withCredentials?: boolean;
}

export class AxiosClient {
    private instance: AxiosInstance;

    constructor(config: AxiosClientConfig) {
        this.instance = axios.create({
            baseURL: config.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...config.headers,
            },
            timeout: config.timeout || 30000,
            withCredentials: config.withCredentials || false,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config) => {
                // Add auth token if available
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log request in development
                if (process.env.NODE_ENV === 'development') {
                    console.log('🚀 API Request:', {
                        method: config.method?.toUpperCase(),
                        url: config.url,
                        data: config.data,
                        headers: config.headers,
                    });
                }

                return config;
            },
            (error) => {
                console.error('❌ Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Log response in development
                if (process.env.NODE_ENV === 'development') {
                    console.log('✅ API Response:', {
                        status: response.status,
                        data: response.data,
                        url: response.config.url,
                    });
                }

                return response;
            },
            (error) => {
                // // Handle different error types
                // if (error.response?.status === 401) {
                //     localStorage.removeItem('authToken');
                //     window.location.href = '/auth/login';
                // }

                console.error('❌ Response Error:', {
                    status: error.response?.status,
                    message: error.response?.data?.message || error.message,
                    url: error.config?.url,
                });

                return Promise.reject(error);
            }
        );
    }

    // Generic request methods
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    }

    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.patch<T>(url, data, config);
        return response.data;
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    }

    // Update configuration
    updateConfig(config: Partial<AxiosClientConfig>) {
        if (config.baseURL) {
            this.instance.defaults.baseURL = config.baseURL;
        }
        if (config.headers) {
            this.instance.defaults.headers = {
                ...this.instance.defaults.headers,
                ...config.headers,
            };
        }
        if (config.timeout) {
            this.instance.defaults.timeout = config.timeout;
        }
    }

    // Get the underlying axios instance
    getInstance(): AxiosInstance {
        return this.instance;
    }
}

// Create default client instance

export const defaultClient = new AxiosClient({ baseURL: API_CONFIG.BASE_URL });

// Export the default client as the main API instance
export default defaultClient; 