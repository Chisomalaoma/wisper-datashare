"use client"

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useLoginUser } from "../../hooks/useAuth";
import { useState } from "react";
import Toast from "../Toast";
import { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginFormInputs {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: any;
}

interface ErrorResponse {
    message: string | string[];
}

// Yup validation schema
const loginSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address")
        .trim(),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .trim(),
}).required();

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormInputs>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
        resolver: yupResolver(loginSchema),
    });

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
        message: '',
        type: 'info',
        isVisible: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type, isVisible: true });
    };

    // Define success handler
    const onSuccess = (data: LoginResponse) => {
        const token = data?.token;

        if (token) {
            showToast('Login successful!', 'success');
            reset(); // Reset form after successful login
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        }
    };

    // Define error handler
    const onError = (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response?.data?.message;
        const descriptions = Array.isArray(errorMessage)
            ? errorMessage
            : [errorMessage || 'Login failed. Please try again.'];

        showToast(descriptions[0], 'error');
    };

    // Use the mutation with callbacks
    const loginMutation = useLoginUser(onError, onSuccess);

    const onSubmit = (data: LoginFormInputs) => {
        // Use mutate instead of mutateAsync
        loginMutation.mutate(data);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
            >
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500 text-gray-900"
                        placeholder="e.g. john.doe@example.com"
                        autoComplete="email"
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register('password')}
                            className="w-full px-4 py-2 pr-12 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                            placeholder="Enter password"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>
                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="cursor-pointer w-full py-2 mt-2 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </button>
                <div className="text-center mt-4">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                        Register here
                    </Link>
                </div>
            </form>
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />
        </>
    );
}