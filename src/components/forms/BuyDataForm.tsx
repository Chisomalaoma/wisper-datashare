'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDataPlans, DataPlan } from '../../api/data';
import { useUserProfile } from '../../hooks/useAuth';
import { allocateData, AllocateDataDto, AllocateDataResponse } from '../../api/data';
import { useMutation } from '@tanstack/react-query';
import Toast from '../Toast';

// New type for the response
type DataPlansByNetwork = {
    [network: string]: DataPlan[];
};

interface BuyDataInputs {
    network: string;
    plan: string;
    phone: string;
}

// Spinner component
function Spinner() {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
}

export default function BuyDataForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<BuyDataInputs>();
    const { data: dataPlans, isLoading, isError } = useQuery<DataPlansByNetwork>({
        queryKey: ['dataPlans'],
        queryFn: getDataPlans,
    });
    const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
        message: '',
        type: 'info',
        isVisible: false
    });

    const mutation = useMutation<AllocateDataResponse, any, AllocateDataDto>({
        mutationFn: allocateData,
        onSuccess: (data) => {
            setToast({
                message: data.message || 'Data purchase successful!',
                type: 'success',
                isVisible: true
            });
        },
        onError: (error: any) => {
            setToast({
                message: error?.response?.data?.message || 'Data purchase failed.',
                type: 'error',
                isVisible: true
            });
        },
    });

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type, isVisible: true });
    };

    console.log({ dataPlans })

    // Get all network names
    const networkNames = dataPlans ? Object.keys(dataPlans) : [];
    const selectedNetwork = watch('network') || networkNames[0] || '';
    // Filter out 500MB plans
    const allPlans = (dataPlans && dataPlans[selectedNetwork]) || [];
    const plans = allPlans.filter(p => !(p.volume === 500 && p.unit === 'mb'));
    const selectedPlanValue = watch('plan') || (plans[0]?.id ?? '');
    const planObj = plans.find(p => p.id === selectedPlanValue) || plans[0];

    const onSubmit = (data: BuyDataInputs) => {
        if (!userProfile || !userProfile.Wallet) {
            showToast('Unable to fetch wallet balance.', 'error');
            return;
        }
        if (!planObj) {
            showToast('Please select a valid data plan.', 'error');
            return;
        }
        if (userProfile.Wallet.walletBalance < planObj.price) {
            showToast('Insufficient wallet balance.', 'error');
            return;
        }
        // Prepare DTO for backend
        const dto: AllocateDataDto = {
            phone: data.phone,
            plan_size: String(planObj.volume + planObj.unit),
            network: selectedNetwork,
            pin: '123456', // Optionally add pin if needed
        };

        console.log({ dto })

        mutation.mutate(dto);
    };

    if (isLoading || isProfileLoading) return <Spinner />;
    if (isError) return <div className="text-center py-8">Failed to load data plans.</div>;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        defaultValue={networkNames[0]}
                    >
                        {networkNames.map((network: string) => (
                            <option key={network} value={network}>{network.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Data Plan</label>
                    <select
                        {...register('plan', { required: true })}
                        className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur"
                        defaultValue={plans[0]?.id}
                    >
                        {plans.map((p: DataPlan) => (
                            <option key={p.id} value={p.id}>
                                {`${p.volume} ${p.unit} (${p.validity}) - ₦${p.price}`}
                            </option>
                        ))}
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
                    <span className="text-xl font-bold text-blue-700">₦{planObj?.price ?? '--'}</span>
                </div>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-2 cursor-pointer rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition disabled:bg-gray-400/60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {mutation.isPending ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            Allocating...
                        </>
                    ) : (
                        'Allocate'
                    )}
                </button>
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