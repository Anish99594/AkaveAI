import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";
import { defineChain } from "viem";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();
const filecoinCalibration = defineChain({
  id: 314159,
  name: "Filecoin Calibration Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test Filecoin",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: {
      http: ["https://api.calibration.node.glif.io/rpc/v1"],
    },
  },
  blockExplorers: {
    default: { name: "Filscan", url: "https://calibration.filscan.io/" },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "EthicalDataMarketPlace",
  projectId: "c0ac38b11c5f6b59d2eb7327cfbf7173",
  chains: [filecoinCalibration],
  ssr: true, // If your dApp uses server-side rendering (SSR)
});


createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider showRecentTransactions={true}>
        <StrictMode>
          <App />

          <Toaster position="bottom-right" reverseOrder={true} />
        </StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);