"use client";

import { useWallet } from "@lazorkit/wallet";
import { useState } from "react";
import { 
  PublicKey, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from "@solana/web3.js";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-800">
              🔐 Powered by Lazorkit SDK
            </span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Passkey Wallet Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience Web2-level UX on Solana with passkey authentication and gasless transactions
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-6">
          <WalletCard />
          <TransferCard />
          <FeaturesGrid />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <a 
              href="https://docs.lazorkit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              📚 Documentation
            </a>
            <a 
              href="https://t.me/lazorkit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              💬 Telegram
            </a>
            <a 
              href="https://github.com/lazor-kit/lazor-kit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              💻 GitHub
            </a>
          </div>
          <p className="text-xs text-gray-500">
            Built for the Lazorkit Bounty • Devnet Only • Not for Production
          </p>
        </footer>
      </div>
    </main>
  );
}

/**
 * Wallet Connection Card
 */
function WalletCard() {
  const { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting, 
    smartWalletPubkey,
    account,
    error 
  } = useWallet();

  const handleConnect = async () => {
    try {
      await connect({ feeMode: "paymaster" });
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">👤</span>
          Your Wallet
        </h2>
      </div>

      {/* Card Body */}
      <div className="p-8 space-y-6">
        {!isConnected ? (
          <>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Create a passkey wallet using your device's biometric authentication
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✅ No seed phrases to remember</li>
                <li>✅ No browser extensions needed</li>
                <li>✅ Secured by Face ID / Touch ID</li>
                <li>✅ Instant setup in seconds</li>
              </ul>
            </div>

            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white rounded-xl font-semibold text-lg shadow-lg
                       hover:shadow-xl hover:scale-105 disabled:opacity-50 
                       disabled:cursor-not-allowed disabled:transform-none
                       transition-all duration-200"
            >
              {isConnecting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting...
                </span>
              ) : (
                "🔐 Connect Passkey Wallet"
              )}
            </button>
          </>
        ) : (
          <>
            {/* Connected State */}
            <div className="space-y-4">
              {/* Wallet Address */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="block text-sm font-medium text-green-800 mb-2">
                  Smart Wallet Address
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-white rounded border border-green-300 
                                 text-sm font-mono text-green-900 break-all">
                    {smartWalletPubkey?.toBase58()}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(smartWalletPubkey?.toBase58() || "");
                    }}
                    className="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    title="Copy address"
                  >
                    📋
                  </button>
                </div>
              </div>

              {/* Credential ID */}
              {account?.credentialId && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <label className="block text-sm font-medium text-blue-800 mb-2">
                    Passkey Credential ID
                  </label>
                  <code className="block p-3 bg-white rounded border border-blue-300 
                                 text-xs font-mono text-blue-900 break-all">
                    {account.credentialId}
                  </code>
                </div>
              )}

              {/* Status Indicator */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Connected & Secured
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg 
                           hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Error:</span> {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Gasless Transfer Card
 */
function TransferCard() {
  const { 
    signAndSendTransaction, 
    smartWalletPubkey, 
    isConnected,
    isSigning 
  } = useWallet();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = async () => {
    if (!isConnected || !smartWalletPubkey) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setTxSignature(null);

      const recipientPubkey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: recipientPubkey,
        lamports: lamports
      });

      const signature = await signAndSendTransaction({
        instructions: [instruction]
      });

      setTxSignature(signature);
      setRecipient("");
      setAmount("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transfer failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center text-gray-500 py-12">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-lg">Connect your wallet to send transactions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">⚡</span>
          Gasless Transfer
        </h2>
      </div>

      {/* Card Body */}
      <div className="p-8 space-y-6">
        {/* Recipient Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter Solana address"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                     transition-all outline-none"
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (SOL)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            step="0.001"
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                     transition-all outline-none"
          />
        </div>

        {/* Info Box */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-900 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span>
              <strong>Gasless!</strong> The paymaster pays all transaction fees. 
              No SOL balance needed.
            </span>
          </p>
        </div>

        {/* Send Button */}
        <button
          onClick={handleTransfer}
          disabled={isLoading || isSigning || !recipient || !amount}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                   text-white rounded-xl font-semibold text-lg shadow-lg
                   hover:shadow-xl hover:scale-105 disabled:opacity-50 
                   disabled:cursor-not-allowed disabled:transform-none
                   transition-all duration-200"
        >
          {isLoading || isSigning ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </span>
          ) : (
            "⚡ Send SOL (Gasless)"
          )}
        </button>

        {/* Transaction Success */}
        {txSignature && (
          <div className="p-6 bg-green-50 rounded-lg border-2 border-green-300 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <h3 className="font-bold text-green-900 text-lg">
                Transaction Successful!
              </h3>
            </div>
            <div>
              <p className="text-sm text-green-700 mb-2 font-medium">
                Transaction Signature:
              </p>
              <code className="block p-3 bg-white rounded border border-green-300 
                              text-xs font-mono text-green-900 break-all">
                {txSignature}
              </code>
            </div>
            <a
              href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 
                       text-white rounded-lg font-medium hover:bg-green-700 
                       transition-colors"
            >
              View on Solana Explorer
              <span>→</span>
            </a>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Error:</span> {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Features Grid
 */
function FeaturesGrid() {
  const features = [
    {
      icon: "🔐",
      title: "Passkey Authentication",
      description: "Use Face ID, Touch ID, or Windows Hello instead of seed phrases"
    },
    {
      icon: "⚡",
      title: "Gasless Transactions",
      description: "Paymaster covers all transaction fees for seamless UX"
    },
    {
      icon: "🔒",
      title: "Device-Level Security",
      description: "Keys secured in TPM/Secure Enclave, never exposed"
    },
    {
      icon: "🌐",
      title: "No Extensions Needed",
      description: "Works directly in browser with WebAuthn standard"
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      description: "Works on web, mobile, and desktop seamlessly"
    },
    {
      icon: "⚡",
      title: "Instant Setup",
      description: "Create wallet in seconds with just biometric auth"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 
                   hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
