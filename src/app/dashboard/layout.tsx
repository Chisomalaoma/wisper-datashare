'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <div className='bg-gradient-to-br from-blue-400/40 to-purple-600/40'>
            <nav className="w-full flex items-center p-4 mb-4 ">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2  text-xl rounded bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition"
                >
                    ← Back
                </button>
            </nav>
            <main>{children}</main>
        </div>
    );
} 