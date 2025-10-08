// Web3Context.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { Web3ContextType } from '../types/web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Create the context at the top of the same file
export const Web3Context = createContext<Web3ContextType>({
  account: null,
  connectWallet: async () => {},
  isConnected: false,
  isConnecting: false,
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install it to continue.');
      return;
    }
    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }
      setAccount(accounts[0]);
      setError(null);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Error connecting wallet: ' + (error as Error).message);
      setAccount(null);
    } finally {
      setIsConnecting(false);
    }
  };

  // Listen for account changes (e.g., user switches accounts or disconnects)
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        setAccount(null);
        setError('Please connect to MetaMask.');
      } else {
        setAccount(accounts[0]);
        setError(null);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // Cleanup listener on unmount
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        connectWallet,
        isConnected: !!account,
        isConnecting,
      }}
    >
      {children}
      {error && <div className="error">{error}</div>}
    </Web3Context.Provider>
  );
};

// Hook for easy access
export const useWeb3 = () => useContext(Web3Context);
