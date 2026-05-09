"use client";

import { useTransactions } from "../hooks/useTransactions";
import Link from "next/link";

const typeLabel: Record<string, string> = {
    WALLET_TOPUP: "Wallet Funding",
    DATA_PURCHASE: "Data Purchase",
    AIRTIME_PURCHASE: "Airtime Purchase",
    INWARD_TRANSFER: "Inward Transfer",
    OUTWARD_TRANSFER: "Outward Transfer",
};

const statusColor: Record<string, string> = {
    successful: "text-green-600",
    failed: "text-red-500",
    pending: "text-yellow-500",
    refunded: "text-blue-500",
};

export default function TransactionsContainer() {
    const { data, isLoading } = useTransactions();
    const transactions = data?.data ?? [];

    return (
        <div className="min-h-screen flex items-center justify-center py-8">
            <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <div className="flex items-center justify-between mb-6">
                    <Link href="/dashboard" className="text-blue-600 font-medium text-sm">← Back</Link>
                    <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
                    <div className="w-12" />
                </div>

                {isLoading ? (
                    <div className="text-center text-gray-500 py-10">Loading...</div>
                ) : transactions.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">No transactions yet</div>
                ) : (
                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="bg-white/50 rounded-xl p-4 flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-gray-800 text-sm">
                                        {typeLabel[tx.transaction_origin] ?? tx.transaction_origin}
                                    </div>
                                    {tx.desc && (
                                        <div className="text-xs text-gray-500 mt-0.5">{tx.desc}</div>
                                    )}
                                    <div className="text-xs text-gray-400 mt-0.5">
                                        {new Date(tx.createdAt).toLocaleDateString('en-NG', {
                                            day: 'numeric', month: 'short', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`font-bold text-sm ${tx.debit_credit === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                                        {tx.debit_credit === 'credit' ? '+' : '-'}₦{tx.amountInNaira.toLocaleString()}
                                    </div>
                                    <div className={`text-xs capitalize mt-0.5 ${statusColor[tx.status]}`}>
                                        {tx.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
