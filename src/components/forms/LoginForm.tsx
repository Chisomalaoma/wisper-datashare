"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginFormInputs {
    phone: string;
    password: string;
}

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const router = useRouter();

    const onSubmit = (data: LoginFormInputs) => {
        // console.log('Login Data:', data);
        router.push('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="e.g. 08123456789"
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="Enter password"
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>
            <button type="submit" className="cursor-pointer w-full py-2 mt-2 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition">Login</button>
            <div className="text-center mt-4">
                <span className="text-gray-600">Don't have an account? </span>
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Register here
                </Link>
            </div>
        </form>
    );
} 