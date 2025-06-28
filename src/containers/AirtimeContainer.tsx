import BuyAirtimeForm from '../components/forms/BuyAirtimeForm';

export default function AirtimeContainer() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/30">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Buy Airtime</h2>
                <BuyAirtimeForm />
            </div>
        </div>
    );
} 