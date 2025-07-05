"use client"

import FundWalletButton from '../components/FundWalletButton';
import BuyAirtimeButton from '../components/BuyAirtimeButton';
import BuyDataButton from '../components/BuyDataButton';
import { useUserProfile } from '../hooks/useAuth';

export default function WalletContainer() {
    const { data: userProfile, isLoading, error, refetch } = useUserProfile();

    // Format wallet balance to Nigerian Naira
    const formatBalance = (balance: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(balance);
    };

    // Get wallet balance from API or fallback to 0
    const walletBalance = userProfile?.Wallet?.walletBalance || 0;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Wallet</h2>
                <div className="mb-6 text-center">
                    <div className="text-gray-700 text-lg">Balance</div>
                    {isLoading ? (
                        <div className="text-4xl font-bold text-gray-900 mb-2">Loading...</div>
                    ) : error ? (
                        <div className="text-4xl font-bold text-red-500 mb-2">Error</div>
                    ) : (
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                            {formatBalance(walletBalance)}
                        </div>
                    )}
                </div>
                <FundWalletButton />
                <div className="flex gap-4 mt-6">
                    <BuyAirtimeButton />
                    <BuyDataButton />
                </div>
                {error && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => refetch()}
                            className="text-blue-600 hover:text-blue-700 text-sm underline"
                        >
                            Retry loading balance
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 