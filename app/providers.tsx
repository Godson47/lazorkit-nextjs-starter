"use client";

import { LazorkitProvider } from "@lazorkit/wallet";
import type { ReactNode } from "react";

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";
const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.lazor.sh";
const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL || "https://kora.devnet.lazorkit.com";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazorkitProvider
      rpcUrl={rpcUrl}
      portalUrl={portalUrl}
      paymasterConfig={{ paymasterUrl }}
    >
      {children}
    </LazorkitProvider>
  );
}
