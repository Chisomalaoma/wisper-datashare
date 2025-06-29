'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface CombinedFormInputs {
    firstName: string;
    surname: string;
    phone: string;
    school: string;
    matric: string;
    nin: string;
}

export default function CombinedRegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<CombinedFormInputs>();

    const onSubmit = (data: CombinedFormInputs) => {
        console.log('Combined Registration & KYC Data:', data);
    };

    return (
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
                        <label className="block text-gray-700 font-medium mb-1">Surname</label>
                        <input
                            {...register('surname', { required: 'Surname is required' })}
                            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                            placeholder="Enter surname"
                        />
                        {errors.surname && <span className="text-red-500 text-xs">{errors.surname.message}</span>}
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
                        <label className="block text-gray-700 font-medium mb-1">NIN</label>
                        <input
                            {...register('nin', { required: 'NIN is required' })}
                            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                            placeholder="Enter NIN"
                        />
                        {errors.nin && <span className="text-red-500 text-xs">{errors.nin.message}</span>}
                    </div>
                </div>
            </div>

            {/* Single Submit Button */}
            <button type="submit" className="w-full py-3 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition text-lg">
                Register & Submit KYC
            </button>

            <div className="text-center mt-4">
                <span className="text-gray-600">Already have an account? </span>
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Login here
                </Link>
            </div>
        </form>
    );
} 