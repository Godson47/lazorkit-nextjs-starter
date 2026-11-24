# Lazorkit Next.js Starter

An educational Next.js App Router demo of passkey wallet connection and gasless transactions using the Lazorkit SDK on **Solana Devnet**.

> **Important:** this is a learning starter, not a production wallet or audited financial application. The current demo is configured for Devnet. Do not use it for mainnet funds without a security review, transaction-flow testing, provider/API compatibility checks, and a threat model.

## Stack

- Next.js App Router and React
- TypeScript
- Lazorkit wallet SDK
- Solana Web3.js and SPL Token libraries
- Tailwind CSS

## Prerequisites

- Node.js 20 or newer
- npm
- A modern browser with WebAuthn/passkey support
- HTTPS or localhost for browser passkey APIs

## Quick start

```bash
git clone https://github.com/Godson47/lazorkit-nextjs-starter.git
cd lazorkit-nextjs-starter
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Windows PowerShell users can copy the file with `Copy-Item .env.example .env.local`.

## Environment configuration

The app defaults to Solana Devnet and the Lazorkit Devnet portal/paymaster. Override only when you know the correct endpoint values:

- `NEXT_PUBLIC_RPC_URL`: Solana RPC endpoint
- `NEXT_PUBLIC_PORTAL_URL`: Lazorkit portal URL
- `NEXT_PUBLIC_PAYMASTER_URL`: Devnet paymaster URL

These are public client-side configuration values, not secrets. Never put private keys, seed phrases, signing secrets, or privileged API tokens in `NEXT_PUBLIC_*` variables. Do not commit `.env.local`.

## Checks

```bash
npm run type-check
npm run lint
npm run build
npm start
```

Run all checks before opening a pull request or deploying. CI currently uses `npm install`. The repository does not yet include a committed npm lockfile; `npm install` will resolve dependencies locally. Commit the generated lockfile after reviewing it so CI and deployments can use reproducible installs.

## Deployment

The app can be deployed to a Node.js-compatible host such as Vercel:

- Framework: Next.js
- Build command: `npm run build`
- Start command: `npm start` (for a self-hosted Node deployment)
- Set the three public environment variables only if overriding the Devnet defaults.
- Use HTTPS and test passkey behavior on the deployed domain.

## Project structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
  providers.tsx
package.json
next.config.ts
postcss.config.js
tailwind.config.ts
tsconfig.json
eslint.config.mjs
.env.example
```

The extensionless tutorial and setup-guide files in the repository are supporting notes, not files loaded by Next.js.

## Before production use

- Confirm the installed Lazorkit SDK version and provider props match the current official SDK.
- Test connection, disconnection, failed transactions, rejected passkeys, network errors, and mobile browsers.
- Review transaction construction and token-account handling; do not assume examples are safe for arbitrary token mints or recipients.
- Add automated tests and CI checks, and review dependency advisories.
- Keep the default network on Devnet until the application is explicitly reviewed for mainnet use.

## License

MIT.
