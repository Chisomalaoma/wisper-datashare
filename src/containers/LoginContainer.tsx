import LoginForm from '../components/forms/LoginForm';

export default function LoginContainer() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400/40 to-purple-600/40">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <LoginForm />
            </div>
        </div>
    );
} 