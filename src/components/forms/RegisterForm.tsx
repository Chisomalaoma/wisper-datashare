"use client"
import { useForm } from 'react-hook-form';

interface RegisterFormInputs {
    firstName: string;
    surname: string;
    phone: string;
}

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();

    const onSubmit = (data: RegisterFormInputs) => {
        console.log('Register Data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="Enter first name"
                />
                {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Surname</label>
                <input
                    {...register('surname', { required: 'Surname is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="Enter surname"
                />
                {errors.surname && <span className="text-red-500 text-xs">{errors.surname.message}</span>}
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="e.g. 08123456789"
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
            </div>
            <button type="submit" className="w-full py-2 mt-2 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition">Register</button>
        </form>
    );
} 