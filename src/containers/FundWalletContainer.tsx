"use client"

import { useState, useEffect } from 'react';

interface BankDetails {
    id: string;
    bankName: string;
    accountName: string;
    bankAccountNumber: string;
    bankCode: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    school: string;
    matric: string;
    nin: string;
    Bank: BankDetails[];
    Wallet: {
        id: string;
        userId: string;
        walletBalance: number;
        walletPin: string | null;
    };
}

export default function FundWalletContainer() {
    const [copied, setCopied] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserData(user);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        setLoading(false);
    }, []);

    const handleCopy = () => {
        if (userData?.Bank?.[0]?.bankAccountNumber) {
            navigator.clipboard.writeText(userData.Bank[0].bankAccountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                    <div className="text-center text-gray-600">Loading bank details...</div>
                </div>
            </div>
        );
    }

    if (!userData || !userData.Bank || userData.Bank.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Fund Wallet</h2>
                    <div className="text-center text-gray-600">
                        No bank details found. Please contact support to set up your bank account.
                    </div>
                </div>
            </div>
        );
    }

    const bankDetails = userData.Bank[0]; // Get the first bank account

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Fund Wallet</h2>
                <div className="mb-6">
                    <div className="text-gray-700 font-medium">Bank Name</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">{bankDetails.bankName}</div>
                    <div className="text-gray-700 font-medium">Account Number</div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold text-gray-900">{bankDetails.bankAccountNumber}</span>
                        <button onClick={handleCopy} className="px-2 py-1 text-xs bg-blue-500/80 text-white rounded hover:bg-blue-600/80 transition">
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="text-gray-700 font-medium">Account Name</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">{bankDetails.accountName}</div>
                    <div className="text-gray-700 font-medium">Bank Code</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">{bankDetails.bankCode}</div>
                </div>
                <div className="text-gray-600 text-sm text-center">
                    Transfer to the above account to fund your wallet. Your balance will update automatically after payment confirmation.
                </div>
            </div>
        </div>
    );
} 