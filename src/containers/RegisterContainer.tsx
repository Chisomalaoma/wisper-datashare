import RegisterForm from '../components/forms/RegisterForm';
import KYCForm from '../components/forms/KYCForm';

export default function RegisterContainer() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400/40 to-purple-600/40">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up & KYC</h2>
                <RegisterForm />
                <div className="my-6 border-t border-gray-300/30" />
                <KYCForm />
            </div>
        </div>
    );
} 