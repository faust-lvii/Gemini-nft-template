import React, { useContext, useState } from 'react';
import { Web3Context } from '../utils/Web3Context';
import { addNetwork, getNetworkName } from '../utils/contractUtils';

const NetworkSwitcher = () => {
  const { provider } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Available networks
  const networks = [
    { id: 1, name: 'Ethereum Mainnet', chainId: '0x1' },
    { id: 5, name: 'Goerli Testnet', chainId: '0x5' },
    { id: 11155111, name: 'Sepolia Testnet', chainId: '0xaa36a7' },
    { id: 1337, name: 'Local Network', chainId: '0x539' }
  ];

  // Switch network function
  const switchNetwork = async (chainId) => {
    if (!provider) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await addNetwork(chainId);
      setIsLoading(false);
    } catch (error) {
      console.error('Error switching network:', error);
      setError(error.message || 'Failed to switch network');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Network Selection</h3>
      <p className="text-gray-400 mb-4">
        Select the Ethereum network you want to connect to:
      </p>
      
      <div className="space-y-2">
        {networks.map((network) => (
          <button
            key={network.id}
            onClick={() => switchNetwork(network.id)}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-3 bg-dark-lighter rounded-lg hover:bg-dark transition-colors"
          >
            <span>{network.name}</span>
            <svg 
              className="w-5 h-5 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        ))}
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Note: You'll need to have MetaMask or another Web3 wallet installed to switch networks.</p>
      </div>
    </div>
  );
};

export default NetworkSwitcher;
