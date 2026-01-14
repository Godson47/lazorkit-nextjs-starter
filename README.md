# 🔐 Lazorkit Next.js Starter Template

A production-ready Next.js starter template demonstrating Lazorkit SDK integration for passkey-based wallet authentication and gasless transactions on Solana.

## 🎯 What This Is

This is a **working code example** (not a full product) that shows developers how to integrate Lazorkit SDK in a real-world Next.js environment. It demonstrates:

- ✅ Passkey-based wallet creation (no seed phrases!)
- ✅ Gasless USDC transfers on Solana Devnet
- ✅ Session persistence across browser tabs
- ✅ Clean, reusable component architecture
- ✅ TypeScript support with full type safety

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern browser with WebAuthn support (Chrome, Safari, Edge, etc.)
- Basic understanding of React and Solana

### Installation

```bash
# Clone this repository
git clone https://github.com/yourusername/lazorkit-nextjs-starter
cd lazorkit-nextjs-starter

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Solana RPC URL (Devnet for testing)
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com

# Lazorkit Portal URL
NEXT_PUBLIC_PORTAL_URL=https://portal.lazor.sh

# Lazorkit Paymaster URL (for gasless transactions)
NEXT_PUBLIC_PAYMASTER_URL=https://kora.devnet.lazorkit.com

# Optional: Paymaster API Key (if required)
# NEXT_PUBLIC_PAYMASTER_API_KEY=your_api_key_here
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
lazorkit-nextjs-starter/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Main demo page
│   │   └── providers.tsx       # Lazorkit provider setup
│   ├── components/
│   │   ├── ConnectButton.tsx   # Passkey connect/disconnect
│   │   ├── WalletInfo.tsx      # Display wallet details
│   │   ├── GaslessTransfer.tsx # Gasless USDC transfer
│   │   └── StatusPanel.tsx     # Real-time status display
│   ├── lib/
│   │   ├── config.ts           # Lazorkit configuration
│   │   └── utils.ts            # Utility functions
│   └── styles/
│       └── globals.css         # Global styles
├── docs/
│   ├── tutorial-01-passkey-wallet.md
│   ├── tutorial-02-gasless-transactions.md
│   └── tutorial-03-session-management.md
├── .env.local.example
├── package.json
└── README.md
```

## 📚 Step-by-Step Tutorials

### [Tutorial 1: Creating a Passkey-Based Wallet](docs/tutorial-01-passkey-wallet.md)

Learn how to:
- Set up the Lazorkit provider
- Create a passkey wallet with biometric authentication
- Handle connection states and errors
- Display wallet information

### [Tutorial 2: Gasless USDC Transfers](docs/tutorial-02-gasless-transactions.md)

Learn how to:
- Build transaction instructions
- Use the paymaster for gasless transactions
- Sign and send transactions
- Handle transaction confirmations

### [Tutorial 3: Session Persistence](docs/tutorial-03-session-management.md)

Learn how to:
- Maintain wallet sessions across browser tabs
- Auto-reconnect on page reload
- Handle session expiration
- Secure session management best practices

## 🎨 Live Demo

**Deployed on Devnet:** [https://lazorkit-starter.vercel.app](https://lazorkit-starter.vercel.app)

Try it yourself:
1. Click "Connect Passkey Wallet"
2. Create a passkey using Face ID/Touch ID/Windows Hello
3. View your smart wallet address
4. Try a gasless USDC transfer

## 🔑 Key Features Demonstrated

### 1. Passkey Authentication
```typescript
const { connect, disconnect, isConnected } = useWallet();

// Connect with passkey
await connect({ feeMode: 'paymaster' });

// User authenticates with biometric (Face ID/Touch ID)
// No seed phrases, no browser extensions needed!
```

### 2. Gasless Transactions
```typescript
const { signAndSendTransaction, smartWalletPubkey } = useWallet();

const instruction = SystemProgram.transfer({
  fromPubkey: smartWalletPubkey,
  toPubkey: recipient,
  lamports: amount
});

// Transaction fee paid by paymaster!
const signature = await signAndSendTransaction({ instructions: [instruction] });
```

### 3. Type-Safe Integration
Full TypeScript support with proper types for all Lazorkit SDK methods and Solana Web3.js integration.

## 🛠️ Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [Lazorkit SDK](https://lazorkit.com/) - Passkey wallet infrastructure
- [@solana/web3.js](https://solana.com/) - Solana JavaScript API
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## ⚠️ Important Notes

- **Devnet Only**: This demo runs on Solana Devnet. Do not use real funds.
- **Pre-Audit**: Lazorkit is pre-audit. Not for production use yet.
- **Browser Support**: Requires WebAuthn support (Chrome 67+, Safari 13+, Edge 18+)

## 🐛 Troubleshooting

### Passkey creation fails
- Ensure you're using HTTPS (required for WebAuthn)
- Check browser console for errors
- Verify your browser supports WebAuthn

### Transaction fails
- Ensure wallet has SOL for non-gasless transactions
- Check Devnet RPC URL is accessible
- Verify paymaster URL is correct for gasless transactions

### Session not persisting
- Check browser storage permissions
- Clear browser cache and try again
- Ensure cookies are enabled

## 📖 Additional Resources

- [Lazorkit Documentation](https://docs.lazorkit.com/)
- [Lazorkit Cookbook](https://lazorkit-cookbook.vercel.app/)
- [Telegram Community](https://t.me/lazorkit)
- [GitHub Repository](https://github.com/lazor-kit/lazor-kit)

## 🤝 Contributing

This is a bounty submission example. For the full Lazorkit SDK:
1. Join the [Telegram group](https://t.me/lazorkit)
2. Check the [GitHub issues](https://github.com/lazor-kit/lazor-kit/issues)
3. Submit PRs with clear descriptions

## 📄 License

MIT License - feel free to use this starter template for your own projects!

## 💡 Next Steps

After exploring this starter:

1. **Build Your dApp**: Use this as a foundation for your Solana application
2. **Add Token Swaps**: Integrate Raydium or Jupiter for DEX functionality
3. **Implement NFT Minting**: Use Metaplex for NFT operations
4. **Add Staking**: Integrate with staking protocols like Marinade
5. **Go Mobile**: Check out the React Native version for mobile apps

## 🙋 Support

- **Documentation Issues**: [docs.lazorkit.com](https://docs.lazorkit.com/)
- **SDK Bugs**: [GitHub Issues](https://github.com/lazor-kit/lazor-kit/issues)
- **Community Help**: [Telegram](https://t.me/lazorkit)

---

**Built with ❤️ for the Lazorkit Bounty**

If you found this starter helpful, give it a ⭐ on GitHub!
