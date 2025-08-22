"use client"

import { useUserProfile } from '@/hooks/useAuth';
import Link from 'next/link';

export default function DashboardContainer() {
    const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
    console.log({ userProfile })
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Dashboard</h2>
                <div className="mb-8 text-center">
                    <div className="text-gray-700 text-lg">Balance</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">₦{userProfile?.Wallet?.walletBalance}</div>
                </div>
                <div className="flex flex-col gap-4">
                    <Link href="/dashboard/data" className="cursor-pointer">
                        <button className="cursor-pointer w-full py-3 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition backdrop-blur text-lg">Buy Data</button>
                    </Link>
                    {/* <Link href="/dashboard/airtime" className="cursor-pointer">
                        <button className="cursor-pointer w-full py-3 rounded-lg bg-yellow-500/80 text-white font-semibold shadow hover:bg-yellow-600/80 transition backdrop-blur text-lg">Buy Airtime</button>
                    </Link> */}
                    <Link href="/dashboard/fund-wallet" className="cursor-pointer">
                        <button className="cursor-pointer w-full py-3 rounded-lg bg-green-500/80 text-white font-semibold shadow hover:bg-green-600/80 transition backdrop-blur text-lg">Fund Wallet</button>
                    </Link>
                </div>
            </div>
        </div>
    );
} 