export default function BuyDataButton() {
    return (
        <button
            className="flex-1 py-2 rounded-lg bg-blue-500/80 text-white font-semibold shadow hover:bg-blue-600/80 transition backdrop-blur"
            onClick={() => alert('Buy Data Clicked!')}
        >
            Buy Data
        </button>
    );
} 