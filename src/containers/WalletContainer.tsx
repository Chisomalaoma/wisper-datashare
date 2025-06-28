"use client"

import FundWalletButton from '../components/FundWalletButton';
import BuyAirtimeButton from '../components/BuyAirtimeButton';
import BuyDataButton from '../components/BuyDataButton';

export default function WalletContainer() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Wallet</h2>
                <div className="mb-6 text-center">
                    <div className="text-gray-700 text-lg">Balance</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">₦0.00</div>
                </div>
                <FundWalletButton />
                <div className="flex gap-4 mt-6">
                    <BuyAirtimeButton />
                    <BuyDataButton />
                </div>
            </div>
        </div>
    );
} 