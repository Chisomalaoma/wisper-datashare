export default function FundWalletButton() {
    return (
        <button
            className="w-full py-2 rounded-lg bg-green-500/80 text-white font-semibold shadow hover:bg-green-600/80 transition backdrop-blur mb-4"
            onClick={() => alert('Fund Wallet Clicked!')}
        >
            Fund Wallet
        </button>
    );
} 