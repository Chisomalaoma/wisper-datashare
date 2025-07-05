'use client';

import { useForm } from 'react-hook-form';
import { useUserProfile } from '../../hooks/useAuth';
import { allocateAirtime, AllocateAirtimeDto, AllocateAirtimeResponse } from '../../api/airtime';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

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
    const { register, handleSubmit, formState: { errors }, watch } = useForm<BuyAirtimeInputs>({
        defaultValues: { network: NETWORKS[0].value }
    });
    const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const mutation = useMutation<AllocateAirtimeResponse, any, AllocateAirtimeDto>({
        mutationFn: allocateAirtime,
        onSuccess: (data) => {
            setSuccessMsg(data.message || 'Airtime purchase successful!');
            setErrorMsg(null);
        },
        onError: (error: any) => {
            setErrorMsg(error?.response?.data?.message || 'Airtime purchase failed.');
            setSuccessMsg(null);
        },
    });

    const onSubmit = (data: BuyAirtimeInputs) => {
        setErrorMsg(null);
        setSuccessMsg(null);
        if (!userProfile || !userProfile.Wallet) {
            setErrorMsg('Unable to fetch wallet balance.');
            return;
        }
        const amount = Number(data.amount);
        if (isNaN(amount) || amount < 50) {
            setErrorMsg('Amount must be at least ₦50.');
            return;
        }
        if (userProfile.Wallet.walletBalance < amount) {
            setErrorMsg('Insufficient wallet balance.');
            return;
        }
        const dto: AllocateAirtimeDto = {
            phone: data.phone,
            amount: data.amount,
            network: data.network,
            // pin: '', // Optionally add pin if needed
        };
        mutation.mutate(dto);
    };

    if (isProfileLoading) return <div className="flex items-center justify-center min-h-[200px]"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div></div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errorMsg && <div className="text-red-600 text-center font-medium">{errorMsg}</div>}
            {successMsg && <div className="text-green-600 text-center font-medium">{successMsg}</div>}
            <div className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2 mb-2">
                <span className="text-white font-medium">Wallet Balance:</span>
                <span className="text-xl font-bold text-white">
                    ₦{userProfile?.Wallet?.walletBalance?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ?? '--'}
                </span>
            </div>
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