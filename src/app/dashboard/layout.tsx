'use client';

import { ReactNode } from 'react';
import Header from '../../components/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className='bg-gradient-to-br from-blue-400/40 to-purple-600/40'>
            <Header />
            <main>{children}</main>
        </div>
    );
} 