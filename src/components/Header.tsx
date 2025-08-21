'use client';

import { useRouter } from 'next/navigation';
import { useUserProfile } from '../hooks/useAuth';

export default function Header() {
    const router = useRouter();
    const { data: userProfile } = useUserProfile();

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        // Redirect to login page
        router.push('/auth/login');
    };

    return (
        <nav className="w-full flex items-center justify-between p-4 mb-4">
            <button
                onClick={() => router.back()}
                className="cursor-pointer px-4 py-2 text-xl rounded bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition"
            >
                ← Back
            </button>

            <div className="flex items-center gap-4">
                {userProfile && (
                    <span className="text-gray-700 font-medium">
                        Welcome, {userProfile.firstname}
                    </span>
                )}
                <button
                    onClick={handleLogout}
                    className="cursor-pointer px-4 py-2 text-xl rounded bg-red-500/80 text-white font-semibold shadow hover:bg-red-600/80 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
