export default function BuyAirtimeButton() {
    return (
        <button
            className="flex-1 py-2 rounded-lg bg-yellow-500/80 text-white font-semibold shadow hover:bg-yellow-600/80 transition backdrop-blur"
            onClick={() => alert('Buy Airtime Clicked!')}
        >
            Buy Airtime
        </button>
    );
} 