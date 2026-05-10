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
                    <Link href="/dashboard/transactions" className="cursor-pointer">
                        <button className="cursor-pointer w-full py-3 rounded-lg bg-purple-500/80 text-white font-semibold shadow hover:bg-purple-600/80 transition backdrop-blur text-lg">Transaction History</button>
                    </Link>
                </div>

                {/* Telegram Community Link */}
                <div className="mt-6 text-center">
                    <a
                        href="https://t.me/datapoolng"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#229ED9]">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.67l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.889z"/>
                        </svg>
                        <span className="text-sm">Join our Telegram community</span>
                    </a>
                </div>
            </div>
        </div>
    );
} 