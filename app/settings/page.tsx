'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  // Animation state
  const [isAnimated, setIsAnimated] = useState(false);

  // Consent settings
  const [consentSettings, setConsentSettings] = useState({
    academicResearch: true,
    commercialResearch: true,
    profitSharing: true,
    anonymizedData: true,
    geneticAnalysis: false,
    futureResearch: true
  });

  // Form status
  const [formStatus, setFormStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sampleUsage: true,
    benefitPayments: true,
    researchFindings: false
  });

  // Wallet settings
  const [walletAddress, setWalletAddress] = useState('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
  const [preferredCrypto, setPreferredCrypto] = useState('ETH');

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleToggleChange = (setting: string, section: 'consent' | 'notifications') => {
    if (section === 'consent') {
      setConsentSettings(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof prev]
      }));
    } else {
      setNotifications(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof prev]
      }));
    }
  };

  const saveSettings = () => {
    setFormStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset back to idle after showing success
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Settings
        </motion.h1>
        <motion.p 
          className="mt-1 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Manage your consent preferences and account settings
        </motion.p>
      </div>

      {/* Demo Banner */}
      <motion.div 
        className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> This is a demonstration of the consent management interface. No actual changes will be saved.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Success Notification */}
      {formStatus === 'success' && (
        <motion.div 
          className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Your settings have been successfully saved!
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Notification */}
      {formStatus === 'error' && (
        <motion.div 
          className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                There was an error saving your settings. Please try again.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
      >
        {/* Consent Management Section */}
        <motion.div 
          className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-8"
          variants={itemVariants}
        >
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Consent Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Control how your samples can be used in research
            </p>
          </div>
          <div className="p-6 space-y-6">
            {/* Academic Research */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Academic Research</h3>
                <p className="text-sm text-gray-500">Allow your samples to be used in non-profit academic research</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={consentSettings.academicResearch}
                  onChange={() => handleToggleChange('academicResearch', 'consent')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Commercial Research */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Commercial Research</h3>
                <p className="text-sm text-gray-500">Allow your samples to be used in for-profit research</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={consentSettings.commercialResearch}
                  onChange={() => handleToggleChange('commercialResearch', 'consent')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Profit Sharing */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Profit Sharing</h3>
                <p className="text-sm text-gray-500">Receive compensation when your samples contribute to commercial value</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={consentSettings.profitSharing}
                  onChange={() => handleToggleChange('profitSharing', 'consent')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Anonymized Data */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Anonymized Data Sharing</h3>
                <p className="text-sm text-gray-500">Allow anonymized data from your samples to be shared with other researchers</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={consentSettings.anonymizedData}
                  onChange={() => handleToggleChange('anonymizedData', 'consent')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Genetic Analysis */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Genetic Analysis</h3>
                <p className="text-sm text-gray-500">Allow genetic analysis to be performed on your samples</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={consentSettings.geneticAnalysis}
                  onChange={() => handleToggleChange('geneticAnalysis', 'consent')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Future Research */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Future Research</h3>
                <p className="text-sm text-gray-500">Allow your samples to be stored for future research projects</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={consentSettings.futureResearch}
                  onChange={() => handleToggleChange('futureResearch', 'consent')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Crypto Settings */}
        <motion.div 
          className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-8"
          variants={itemVariants}
        >
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Cryptocurrency Settings</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your cryptocurrency preferences for receiving benefits
            </p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
              <div className="flex">
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="flex-grow focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="0x..."
                />
                <button className="ml-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Verify
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">This is where your benefits will be sent</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Cryptocurrency</label>
              <div className="mt-1">
                <div className="space-y-2">
                  {['ETH', 'BTC', 'USDC', 'USDT'].map((crypto) => (
                    <div key={crypto} className="flex items-center">
                      <input
                        id={`crypto-${crypto}`}
                        name="preferred-crypto"
                        type="radio"
                        checked={preferredCrypto === crypto}
                        onChange={() => setPreferredCrypto(crypto)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor={`crypto-${crypto}`} className="ml-3 block text-sm font-medium text-gray-700">
                        {crypto === 'ETH' ? 'Ethereum (ETH)' :
                         crypto === 'BTC' ? 'Bitcoin (BTC)' :
                         crypto === 'USDC' ? 'USD Coin (USDC)' : 'Tether (USDT)'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                You will receive benefits in your preferred cryptocurrency. Conversion rates will be determined at the time of payment.
              </p>
            </div>

            <div className="flex rounded-md shadow-sm bg-gray-50 p-4">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                <div className="mt-1 text-sm text-yellow-700">
                  <p>
                    Always double-check your wallet address. Cryptocurrency transactions are irreversible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div 
          className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-8"
          variants={itemVariants}
        >
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
            <p className="mt-1 text-sm text-gray-500">
              Control how you want to be notified about your samples and benefits
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Notification Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input 
                      id="notify-email" 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={() => handleToggleChange('email', 'notifications')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                    />
                    <label htmlFor="notify-email" className="ml-3 block text-sm text-gray-700">
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-push" 
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleToggleChange('push', 'notifications')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                    />
                    <label htmlFor="notify-push" className="ml-3 block text-sm text-gray-700">
                      Push notifications
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Notification Events</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input 
                      id="notify-usage" 
                      type="checkbox"
                      checked={notifications.sampleUsage}
                      onChange={() => handleToggleChange('sampleUsage', 'notifications')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                    />
                    <label htmlFor="notify-usage" className="ml-3 block text-sm text-gray-700">
                      Sample usage notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-benefits" 
                      type="checkbox"
                      checked={notifications.benefitPayments}
                      onChange={() => handleToggleChange('benefitPayments', 'notifications')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                    />
                    <label htmlFor="notify-benefits" className="ml-3 block text-sm text-gray-700">
                      Benefit payment notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-findings" 
                      type="checkbox"
                      checked={notifications.researchFindings}
                      onChange={() => handleToggleChange('researchFindings', 'notifications')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                    />
                    <label htmlFor="notify-findings" className="ml-3 block text-sm text-gray-700">
                      Research findings notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div 
          className="flex justify-end"
          variants={itemVariants}
        >
          <button
            onClick={saveSettings}
            disabled={formStatus === 'saving'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {formStatus === 'saving' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}