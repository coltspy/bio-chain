import { useState, useEffect } from 'react';

// Define wallet types
export type WalletType = 'MetaMask' | 'Coinbase Wallet' | 'WalletConnect';

// Define wallet interface
export interface WalletInfo {
  address: string;
  type: WalletType | null;
  connected: boolean;
  balance: string;
}

export function useWallet() {
  // Initialize wallet state
  const [wallet, setWallet] = useState<WalletInfo>({
    address: '',
    type: null,
    connected: false,
    balance: '0',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Check for existing wallet connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('biotrack_wallet');
    if (savedWallet) {
      try {
        setWallet(JSON.parse(savedWallet));
      } catch (err) {
        console.error('Failed to parse saved wallet data');
        localStorage.removeItem('biotrack_wallet');
      }
    }
  }, []);

  // Save wallet data to localStorage when it changes
  useEffect(() => {
    if (wallet.connected) {
      localStorage.setItem('biotrack_wallet', JSON.stringify(wallet));
    } else {
      localStorage.removeItem('biotrack_wallet');
    }
  }, [wallet]);

  // Connect to wallet
  const connect = async (walletType: WalletType) => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would connect to the actual wallet
      // For this mockup, we'll simulate it
      
      // Generate a mock address
      const mockAddress = '0x' + Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      
      // Simulate a delay for connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set wallet info
      setWallet({
        address: mockAddress,
        type: walletType,
        connected: true,
        balance: (Math.random() * 10).toFixed(4),
      });
      
      return { success: true, address: mockAddress };
    } catch (err) {
      setError('Failed to connect wallet');
      console.error('Wallet connection error:', err);
      return { success: false, error: 'Failed to connect wallet' };
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setWallet({
      address: '',
      type: null,
      connected: false,
      balance: '0',
    });
  };

  // Format address for display (0x1234...5678)
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return {
    wallet,
    connect,
    disconnect,
    formatAddress,
    loading,
    error
  };
}