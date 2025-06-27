"use client"

import { useState } from 'react';

export default function FundWalletContainer() {
    const [copied, setCopied] = useState(false);
    const accountNumber = '9649924823';
    const bankName = 'Providus Bank';
    const accountName = 'CHISOM GOODLUCK';

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Fund Wallet</h2>
                <div className="mb-6">
                    <div className="text-gray-700 font-medium">Bank Name</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">{bankName}</div>
                    <div className="text-gray-700 font-medium">Account Number</div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold text-gray-900">{accountNumber}</span>
                        <button onClick={handleCopy} className="px-2 py-1 text-xs bg-blue-500/80 text-white rounded hover:bg-blue-600/80 transition">
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="text-gray-700 font-medium">Account Name</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">{accountName}</div>
                </div>
                <div className="text-gray-600 text-sm text-center">Transfer to the above account to fund your wallet. Your balance will update automatically after payment confirmation.</div>
            </div>
        </div>
    );
} 