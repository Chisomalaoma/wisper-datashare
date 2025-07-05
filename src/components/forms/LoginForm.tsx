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
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                        placeholder="Enter password"
                        autoComplete="current-password"
                    />
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