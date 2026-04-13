'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRegisterUser } from '../../hooks/useAuth';
import Toast from '../Toast';

interface CombinedFormInputs {
    firstName: string;
    lastName: string;
    phone: string;
    school: string;
    matric: string;
    nin: string;
    email: string;
    password: string;
}

export default function CombinedRegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<CombinedFormInputs>();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
        message: '',
        type: 'info',
        isVisible: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const registerMutation = useRegisterUser();

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type, isVisible: true });
    };

    const onSubmit = async (data: CombinedFormInputs) => {

        console.log({ data })
        try {
            const result = await registerMutation.mutateAsync(data);

            console.log({ result })

            if (result.user) {
                // Redirect to dashboard or login
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                showToast(result.message || 'Registration failed', 'error');
            }
        } catch (error) {
            showToast('Registration failed. Please try again.', 'error');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Registration Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">First Name</label>
                            <input
                                {...register('firstName', { required: 'First name is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter first name"
                            />
                            {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                            <input
                                {...register('lastName', { required: 'Last Name is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter last name"
                            />
                            {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter email address"
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <input
                                {...register('phone', { required: 'Phone number is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="e.g. 08123456789"
                            />
                            {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                    className="w-full px-4 py-2 pr-12 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                    placeholder="Enter password (min 6 characters)"
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
                    </div>
                </div>

                {/* KYC Section - DISABLED for now */}
                {/* <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">KYC Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">School Name</label>
                            <input
                                {...register('school')}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter school name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Matric Number</label>
                            <input
                                {...register('matric')}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter matric number"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">NIN</label>
                            <input
                                {...register('nin')}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter NIN"
                            />
                        </div>
                    </div>
                </div> */}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full py-3 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 disabled:bg-gray-400/60 disabled:cursor-not-allowed transition text-lg"
                >
                    {registerMutation.isPending ? 'Registering...' : 'Register'}
                </button>

                <div className="text-center mt-4">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        Login here
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