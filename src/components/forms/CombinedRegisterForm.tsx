'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { useRequestOTP, useRegisterUser } from '../../hooks/useAuth';
import Toast from '../Toast';

interface CombinedFormInputs {
    firstname: string;
    lastname: string;
    phone: string;
    school: string;
    matric: string;
    nin: string;
    email: string;
    password: string;
    dob: string;
    gender: string;
}

export default function CombinedRegisterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<CombinedFormInputs>();
    const [isNINVerified, setIsNINVerified] = useState(false);
    const [otpRequested, setOtpRequested] = useState(false);
    const [requestId, setRequestId] = useState<string>('');
    const [ninVerificationStatus, setNinVerificationStatus] = useState<string>('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
        message: '',
        type: 'info',
        isVisible: false
    });

    const requestOTPMutation = useRequestOTP();
    const registerMutation = useRegisterUser();

    const watchedNin = watch('nin');
    const watchedPhone = watch('phone');
    const watchedFirstName = watch('firstname');
    const watchedLastName = watch('lastname');
    const watchedEmail = watch('email');
    const watchedDob = watch('dob');
    const watchedGender = watch('gender');

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type, isVisible: true });
    };

    const handleRequestOTP = async () => {
        if (!watchedNin || !watchedPhone || !watchedFirstName || !watchedLastName || !watchedDob || !watchedGender) {
            showToast('Please fill in First Name, Last Name, Phone Number, Date of Birth, Gender, and NIN before requesting OTP', 'error');
            return;
        }

        try {
            const result = await requestOTPMutation.mutateAsync({
                idNumber: watchedNin,
                firstname: watchedFirstName,
                lastname: watchedLastName,
                dob: watchedDob,
                email: watchedEmail,
                gender: watchedGender,
                phone: watchedPhone
            });

            if (result.success) {
                // Check if we got an EXACT_MATCH from the backend
                if (result.status === 'EXACT_MATCH') {
                    setIsNINVerified(true);
                    setNinVerificationStatus('EXACT_MATCH');
                    showToast('NIN verification successful! You can now proceed with registration.', 'success');
                } else {
                    setIsNINVerified(false);
                    setNinVerificationStatus(result.status || 'FAILED');
                    showToast('NIN verification failed. Please check your details and try again.', 'error');
                }
                setRequestId(result.requestId || '');
            } else {
                setIsNINVerified(false);
                setNinVerificationStatus('FAILED');
                showToast(result.message || 'Failed to verify NIN', 'error');
            }
        } catch (error) {
            showToast('Failed to verify NIN. Please try again.', 'error');
        }
    };

    const onSubmit = async (data: CombinedFormInputs) => {
        if (!isNINVerified) {
            showToast('Please verify your NIN first', 'error');
            return;
        }

        try {
            const registrationData = {
                ...data,
                requestId: requestId
            };

            const result = await registerMutation.mutateAsync(registrationData);
            if (result.success) {
                showToast('Registration successful!', 'success');
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
                                {...register('firstname', { required: 'First name is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter first name"
                            />
                            {errors.firstname && <span className="text-red-500 text-xs">{errors.firstname.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                            <input
                                {...register('lastname', { required: 'Last Name is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter last name"
                            />
                            {errors.lastname && <span className="text-red-500 text-xs">{errors.lastname.message}</span>}
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
                            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                            <input
                                type="date"
                                {...register('dob', { required: 'Date of birth is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                            />
                            {errors.dob && <span className="text-red-500 text-xs">{errors.dob.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Gender</label>
                            <select
                                {...register('gender', { required: 'Gender is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter password (min 6 characters)"
                            />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>
                    </div>
                </div>

                {/* KYC Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">KYC Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">School Name</label>
                            <input
                                {...register('school', { required: 'School name is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter school name"
                            />
                            {errors.school && <span className="text-red-500 text-xs">{errors.school.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Matric Number</label>
                            <input
                                {...register('matric', { required: 'Matric number is required' })}
                                className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                placeholder="Enter matric number"
                            />
                            {errors.matric && <span className="text-red-500 text-xs">{errors.matric.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">BVN</label>
                            <div className="flex gap-2">
                                <input
                                    {...register('nin', { required: 'BVN is required' })}
                                    className="flex-1 px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                                    placeholder="Enter BVN"
                                />
                                <button
                                    type="button"
                                    onClick={handleRequestOTP}
                                    disabled={requestOTPMutation.isPending || !watchedNin || !watchedPhone || !watchedFirstName || !watchedLastName || !watchedDob || !watchedGender}
                                    className="cursor-pointer px-4 py-2 bg-green-500/80 text-white rounded-lg hover:bg-green-600/80 disabled:bg-gray-400/60 disabled:cursor-not-allowed transition"
                                >
                                    {requestOTPMutation.isPending ? 'Verifying...' : 'Verify NIN'}
                                </button>
                            </div>
                            {errors.nin && <span className="text-red-500 text-xs">{errors.nin.message}</span>}
                            {ninVerificationStatus === 'EXACT_MATCH' && (
                                <span className="text-green-600 text-xs">✓ NIN verification successful</span>
                            )}
                            {ninVerificationStatus && ninVerificationStatus !== 'EXACT_MATCH' && (
                                <span className="text-red-500 text-xs">✗ NIN verification failed: {ninVerificationStatus}</span>
                            )}
                        </div>


                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isNINVerified || registerMutation.isPending}
                    className="w-full py-3 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 disabled:bg-gray-400/60 disabled:cursor-not-allowed transition text-lg"
                >
                    {registerMutation.isPending ? 'Registering...' : 'Register & Submit KYC'}
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