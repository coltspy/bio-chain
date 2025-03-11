'use client';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

export default function ConnectModal({ isOpen, onClose, onConnect }: ConnectModalProps) {
  if (!isOpen) return null;
  
  const walletOptions = [
    {
      name: 'MetaMask',
      description: 'Connect to your MetaMask wallet',
      icon: (
        <svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
          <path d="M30.3 1L18.1 10.6L20.5 4.9L30.3 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.7 1L14.8 10.7L12.5 4.9L2.7 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25.8 23L22.5 28.2L29.7 30.2L31.7 23.2L25.8 23Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.3 23.2L3.3 30.2L10.5 28.2L7.2 23L1.3 23.2Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.1 14.1L8 17.2L15.1 17.5L14.8 9.7L10.1 14.1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.9 14.1L18.1 9.6L17.9 17.5L25 17.2L22.9 14.1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: 'bg-[#F6851B]'
    },
    {
      name: 'Coinbase Wallet',
      description: 'Connect to your Coinbase wallet',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
          <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#1652F0"/>
          <path d="M16 6.82666C10.9451 6.82666 6.82666 10.9451 6.82666 16C6.82666 21.0549 10.9451 25.1733 16 25.1733C21.0549 25.1733 25.1733 21.0549 25.1733 16C25.1733 10.9451 21.0549 6.82666 16 6.82666ZM16 20.6933C13.4223 20.6933 11.3067 18.5777 11.3067 16C11.3067 13.4223 13.4223 11.3067 16 11.3067C18.5777 11.3067 20.6933 13.4223 20.6933 16C20.6933 18.5777 18.5777 20.6933 16 20.6933Z" fill="white"/>
        </svg>
      ),
      color: 'bg-[#0052FF]'
    },
    {
      name: 'WalletConnect',
      description: 'Scan with your mobile wallet',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
          <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#3B99FC"/>
          <path d="M10.3132 12.4321C13.3131 9.43299 18.1183 9.43299 21.1182 12.4321L21.5183 12.8321C21.6967 13.0105 21.6967 13.2962 21.5183 13.4747L20.2455 14.7471C20.1563 14.8363 20.0134 14.8363 19.9242 14.7471L19.3706 14.1936C17.2825 12.1062 14.1489 12.1062 12.0608 14.1936L11.462 14.7923C11.3729 14.8815 11.23 14.8815 11.1408 14.7923L9.86801 13.5199C9.68959 13.3415 9.68959 13.0558 9.86801 12.8773L10.3132 12.4321ZM23.6219 14.9355L24.7675 16.0808C24.9459 16.2592 24.9459 16.5449 24.7675 16.7233L19.8226 21.6674C19.6442 21.8458 19.3585 21.8458 19.1801 21.6674C19.1801 21.6674 19.1801 21.6674 19.1801 21.6674L15.7824 18.2702C15.7378 18.2256 15.6646 18.2256 15.62 18.2702C15.62 18.2702 15.62 18.2702 15.62 18.2702L12.2224 21.6674C12.044 21.8458 11.7583 21.8458 11.5799 21.6674C11.5799 21.6674 11.5799 21.6674 11.5799 21.6674L6.63494 16.7228C6.45652 16.5444 6.45652 16.2587 6.63494 16.0802L7.78051 14.935C7.95893 14.7566 8.24462 14.7566 8.42304 14.935L11.8212 18.3322C11.8658 18.3768 11.9389 18.3768 11.9835 18.3322C11.9835 18.3322 11.9835 18.3322 11.9835 18.3322L15.3811 14.935C15.5595 14.7566 15.8452 14.7566 16.0236 14.935C16.0236 14.935 16.0236 14.935 16.0236 14.935L19.4213 18.3322C19.4659 18.3768 19.5391 18.3768 19.5837 18.3322L22.9813 14.9355C23.1597 14.7571 23.4454 14.7571 23.6238 14.9355L23.6219 14.9355Z" fill="white"/>
        </svg>
      ),
      color: 'bg-[#3B99FC]'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-6 pt-5 pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Connect your wallet
                </h3>
                <div className="mt-1">
                  <p className="text-sm text-gray-500">
                    Connect your wallet to track your samples and receive benefits
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
                  <strong>Demo Mode:</strong> This is a demonstration only. No real wallet will be connected.
                </p>
              </div>
            </div>
          </div>
          
          <div className="px-6 pb-6 space-y-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
                onClick={() => onConnect(wallet.name)}
              >
                <div className={`h-10 w-10 rounded-full ${wallet.color} flex items-center justify-center`}>
                  {wallet.icon}
                </div>
                <div className="ml-4 text-left">
                  <p className="font-medium text-gray-900">{wallet.name}</p>
                  <p className="text-sm text-gray-500">{wallet.description}</p>
                </div>
              </button>
            ))}
            
            <div className="pt-4 text-center text-xs text-gray-500">
              <p>
                By connecting, you agree to our <span className="text-indigo-600 cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}