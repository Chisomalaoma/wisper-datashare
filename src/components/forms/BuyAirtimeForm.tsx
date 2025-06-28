'use client';

import { useForm } from 'react-hook-form';

const NETWORKS = [
    { label: 'MTN', value: 'mtn' },
    { label: 'AIRTEL', value: 'airtel' },
    { label: 'GLO', value: 'glo' },
    { label: '9MOBILE', value: '9mobile' },
];

interface BuyAirtimeInputs {
    network: string;
    amount: string;
    phone: string;
}

export default function BuyAirtimeForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<BuyAirtimeInputs>({
        defaultValues: { network: NETWORKS[0].value }
    });

    const onSubmit = (data: BuyAirtimeInputs) => {
        console.log('Buy Airtime:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-gray-700 font-medium mb-1">Network Provider</label>
                <select
                    {...register('network', { required: true })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur"
                >
                    {NETWORKS.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Amount</label>
                <input
                    type="number"
                    min="50"
                    step="50"
                    {...register('amount', { required: 'Amount is required', min: { value: 50, message: 'Minimum ₦50' } })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="Enter amount (₦)"
                />
                {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur placeholder-gray-500"
                    placeholder="08123456789"
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
            </div>
            <button type="submit" className="w-full py-2 rounded-lg bg-yellow-500/80 text-white font-semibold shadow hover:bg-yellow-600/80 transition">Buy</button>
        </form>
    );
} 