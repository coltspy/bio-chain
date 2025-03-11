'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CryptoBalance {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  icon: string;
  color: string;
}

interface EarningHistory {
  id: string;
  date: string;
  amount: string;
  project: string;
  institution: string;
  token: string;
  status: 'pending' | 'completed' | 'failed';
}

export default function BenefitsPage() {
  // State for selected cryptocurrency
  const [selectedCrypto, setSelectedCrypto] = useState<string>('ETH');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock crypto balances
  const [cryptoBalances, setCryptoBalances] = useState<CryptoBalance[]>([
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 0.125,
      usdValue: 362.5,
      icon: '⟠',
      color: 'bg-indigo-500'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.0035,
      usdValue: 175.0,
      icon: '₿',
      color: 'bg-orange-500'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 124.5,
      usdValue: 124.5,
      icon: '$',
      color: 'bg-blue-500'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      balance: 87.25,
      usdValue: 87.25,
      icon: '$',
      color: 'bg-green-500'
    }
  ]);

  // Mock earnings history
  const [earningHistory] = useState<EarningHistory[]>([
    {
      id: 'TX12345',
      date: '2024-02-15',
      amount: '0.045',
      project: 'RES456',
      institution: 'Genentech',
      token: 'ETH',
      status: 'completed'
    },
    {
      id: 'TX12346',
      date: '2024-01-22',
      amount: '0.0012',
      project: 'RES789',
      institution: 'Mayo Clinic',
      token: 'BTC',
      status: 'completed'
    },
    {
      id: 'TX12347',
      date: '2024-03-04',
      amount: '45.25',
      project: 'RES901',
      institution: 'Johns Hopkins University',
      token: 'USDC',
      status: 'pending'
    },
    {
      id: 'TX12348',
      date: '2024-03-10',
      amount: '0.028',
      project: 'RES902',
      institution: 'Columbia University',
      token: 'ETH',
      status: 'pending'
    }
  ]);

  // Calculate total USD value
  const totalUsdValue = cryptoBalances.reduce((total, crypto) => total + crypto.usdValue, 0);

  // Handle withdrawal
  const handleWithdrawal = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    
    setIsLoading(true);
    
    // Simulate withdrawal process
    setTimeout(() => {
      const amount = parseFloat(withdrawAmount);
      const updatedBalances = cryptoBalances.map(crypto => {
        if (crypto.symbol === selectedCrypto) {
          const newBalance = crypto.balance - amount;
          return {
            ...crypto,
            balance: newBalance >= 0 ? newBalance : 0,
            usdValue: newBalance >= 0 ? newBalance * (crypto.usdValue / crypto.balance) : 0
          };
        }
        return crypto;
      });
      
      setCryptoBalances(updatedBalances);
      setIsLoading(false);
      setShowWithdrawModal(false);
      setWithdrawAmount('');
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Selected crypto info
  const selectedCryptoInfo = cryptoBalances.find(crypto => crypto.symbol === selectedCrypto);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Benefits</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage your research benefits in cryptocurrency
        </p>
      </div>

      {/* Total Balance Card */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-lg shadow-lg overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 text-white">
          <h2 className="text-lg font-medium text-indigo-100">Total Balance</h2>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-bold">${totalUsdValue.toFixed(2)}</p>
            <p className="ml-2 text-indigo-200">USD</p>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="px-4 py-2 bg-white text-indigo-700 rounded-md font-medium hover:bg-indigo-50 transition-colors"
            >
              Withdraw Funds
            </button>
          </div>
        </div>
        <div className="bg-indigo-800 bg-opacity-40 p-4">
          <div className="flex justify-between text-indigo-100 text-sm">
            <span>Earnings This Month</span>
            <span>+$78.45</span>
          </div>
        </div>
      </motion.div>

      {/* Crypto Balances */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Crypto Balances</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cryptoBalances.map((crypto) => (
          <motion.div 
            key={crypto.symbol}
            variants={itemVariants}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer ${
              selectedCrypto === crypto.symbol ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setSelectedCrypto(crypto.symbol)}
          >
            <div className="p-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${crypto.color} text-white flex items-center justify-center text-xl font-bold`}>
                  {crypto.icon}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{crypto.name}</p>
                  <p className="text-xs text-gray-500">{crypto.symbol}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xl font-semibold">{crypto.balance.toFixed(crypto.symbol === 'USDC' || crypto.symbol === 'USDT' ? 2 : 6)}</p>
                <p className="text-sm text-gray-500">${crypto.usdValue.toFixed(2)} USD</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Earning Preference Section */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Earning Preferences</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose which cryptocurrency you want to receive as benefits
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-col space-y-4">
            {cryptoBalances.map(crypto => (
              <label key={crypto.symbol} className="flex items-center">
                <input
                  type="radio"
                  name="earningPreference"
                  value={crypto.symbol}
                  checked={selectedCrypto === crypto.symbol}
                  onChange={() => setSelectedCrypto(crypto.symbol)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <div className={`w-6 h-6 rounded-full ${crypto.color} text-white flex items-center justify-center text-xs font-bold mr-2`}>
                    {crypto.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{crypto.name} ({crypto.symbol})</span>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Your earning preference determines which cryptocurrency you'll receive when your samples contribute to research projects. Changes will apply to future earnings only.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Token
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {earningHistory.map((earning) => (
                <tr key={earning.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    {earning.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {earning.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {earning.amount} {earning.token}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      earning.token === 'ETH' ? 'bg-indigo-100 text-indigo-800' :
                      earning.token === 'BTC' ? 'bg-orange-100 text-orange-800' :
                      earning.token === 'USDC' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {earning.token}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {earning.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {earning.institution}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      earning.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : earning.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => !isLoading && setShowWithdrawModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-5 pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Withdraw {selectedCryptoInfo?.name}
                    </h3>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        Available balance: {selectedCryptoInfo?.balance.toFixed(6)} {selectedCryptoInfo?.symbol}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 px-6 py-3 border-y border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Demo Mode:</strong> No actual cryptocurrency will be transferred.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount to withdraw
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">{selectedCryptoInfo?.symbol}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 mb-1">
                    Withdrawal Wallet Address
                  </label>
                  <input
                    type="text"
                    name="wallet"
                    id="wallet"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="0x..."
                    disabled={isLoading}
                    defaultValue="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3 disabled:opacity-50"
                  onClick={() => setShowWithdrawModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  onClick={handleWithdrawal}
                  disabled={isLoading || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > (selectedCryptoInfo?.balance || 0)}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Withdraw'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}