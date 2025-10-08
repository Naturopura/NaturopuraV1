// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import posthog from 'posthog-js';

import '@rainbow-me/rainbowkit/styles.css'; // ✅ Required for styling

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { bsc, mainnet, polygonAmoy, sepolia } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID, // ✅ Use env variable instead of hardcoded 'YOUR_PROJECT_ID'
  chains: [mainnet, sepolia, polygonAmoy, bsc],
  ssr: false, // ✅ optional, but recommended unless you're using SSR
});

posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
  api_host: 'https://app.posthog.com',
  autocapture: true,
  session_recording: {
    blockClass: 'ph-no-capture',
    blockSelector: null,
    ignoreClass: 'ph-ignore-input',
    maskTextClass: 'ph-mask',
    maskTextSelector: null,
    maskAllInputs: false,
    maskInputOptions: {},
  },
  loaded: (posthog) => {
    if (import.meta.env.DEV) posthog.debug();
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider> 
          <AuthProvider>
            <App />
          </AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
