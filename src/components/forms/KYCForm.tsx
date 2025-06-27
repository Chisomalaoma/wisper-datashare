import { useForm } from 'react-hook-form';

interface KYCFormInputs {
    school: string;
    matric: string;
    nin: string;
}

export default function KYCForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<KYCFormInputs>();

    const onSubmit = (data: KYCFormInputs) => {
        console.log('KYC Data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium mb-1">School Name</label>
                <input
                    {...register('school', { required: 'School name is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="Enter school name"
                />
                {errors.school && <span className="text-red-500 text-xs">{errors.school.message}</span>}
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Matric Number</label>
                <input
                    {...register('matric', { required: 'Matric number is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="Enter matric number"
                />
                {errors.matric && <span className="text-red-500 text-xs">{errors.matric.message}</span>}
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">NIN</label>
                <input
                    {...register('nin', { required: 'NIN is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="Enter NIN"
                />
                {errors.nin && <span className="text-red-500 text-xs">{errors.nin.message}</span>}
            </div>
            <button type="submit" className="w-full py-2 mt-2 rounded-lg bg-purple-500/80 text-white font-semibold shadow hover:bg-purple-600/80 transition">Submit KYC</button>
        </form>
    );
} 