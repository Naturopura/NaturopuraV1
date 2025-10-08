// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import SmoothScrolling from "./components/wrapper/SmoothScrolling";

import "@rainbow-me/rainbowkit/styles.css"; // ✅ Required for styling

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { bsc, mainnet, polygonAmoy, sepolia } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID, // ✅ Use env variable instead of hardcoded 'YOUR_PROJECT_ID'
  chains: [mainnet, sepolia, polygonAmoy, bsc],
  ssr: false, // ✅ optional, but recommended unless you're using SSR
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <AuthProvider>
              <SmoothScrolling>
                <App />
              </SmoothScrolling>
            </AuthProvider>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
