'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

const NETWORKS = [
    { label: 'MTN GIFTING', value: 'mtn_gifting' },
    { label: 'AIRTEL GIFTING', value: 'airtel_gifting' },
    { label: 'GLO GIFTING', value: 'glo_gifting' },
    { label: '9MOBILE GIFTING', value: '9mobile_gifting' },
];

const DATA_PLANS = [
    { label: '500.0 mb (monthly)', value: '500mb', price: 150 },
    { label: '1.0 gb (monthly)', value: '1gb', price: 250 },
    { label: '2.0 gb (monthly)', value: '2gb', price: 450 },
    { label: '5.0 gb (monthly)', value: '5gb', price: 1100 },
];

interface BuyDataInputs {
    network: string;
    plan: string;
    phone: string;
}

export default function BuyDataForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<BuyDataInputs>({
        defaultValues: { network: NETWORKS[0].value, plan: DATA_PLANS[0].value }
    });
    const selectedPlan = watch('plan') || DATA_PLANS[0].value;
    const planObj = DATA_PLANS.find(p => p.value === selectedPlan) || DATA_PLANS[0];

    const onSubmit = (data: BuyDataInputs) => {
        console.log('Buy Data:', { ...data, price: planObj.price });
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
                <label className="block text-gray-700 font-medium mb-1">Data Plan</label>
                <select
                    {...register('plan', { required: true })}
                    className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur"
                >
                    {DATA_PLANS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
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
            <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Cost:</span>
                <span className="text-xl font-bold text-blue-700">₦{planObj.price}</span>
            </div>
            <button type="submit" className="w-full py-2 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition">Allocate</button>
        </form>
    );
} 