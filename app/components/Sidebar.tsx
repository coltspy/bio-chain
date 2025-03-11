'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ConnectModal from './ConnectModal';
import { useWallet, WalletType } from '@/hooks/useWallet';

// Define navigation items
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3" />
      </svg>
    ),
  },
  {
    name: 'My Samples',
    href: '/samples',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    name: 'Benefits',
    href: '/benefits',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { wallet, connect, disconnect, formatAddress, loading } = useWallet();

  // Handle wallet connection
  const handleConnect = async (walletType: WalletType) => {
    await connect(walletType);
    setShowConnectModal(false);
  };

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="bg-white w-64 shrink-0 border-r border-gray-200 flex flex-col"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div 
        className="p-6"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-bold text-indigo-600">BioTrack</h1>
        <p className="text-sm text-gray-500 mt-1">Sample Tracking Portal</p>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.li key={item.name} variants={itemVariants}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={`mr-3 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-md"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Demo Banner */}
      <motion.div 
        className="px-4 mb-4"
        variants={itemVariants}
      >
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700">
            <strong>Demo Mode:</strong> This is a demonstration only. No real wallet will be connected.
          </p>
        </div>
      </motion.div>

      {/* Wallet Connection Status */}
      <motion.div 
        className="p-4 mt-auto border-t border-gray-200"
        variants={itemVariants}
      >
        {wallet.connected ? (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Connected</p>
              <div className="flex items-center">
                <p className="text-xs text-gray-500 truncate">
                  {formatAddress(wallet.address)}
                </p>
                <button 
                  onClick={disconnect}
                  className="ml-2 text-xs text-indigo-600 hover:text-indigo-800"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowConnectModal(true)}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : (
              'Connect Wallet'
            )}
          </button>
        )}
      </motion.div>

      {/* Version */}
      <motion.div 
        className="p-4 text-center text-xs text-gray-400"
        variants={itemVariants}
      >
        BioTrack v0.1.0 (Demo)
      </motion.div>

      {/* Connect Modal */}
      <ConnectModal 
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={handleConnect}
      />
    </motion.div>
  );
}