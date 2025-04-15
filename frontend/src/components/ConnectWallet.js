import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import { formatAddress } from '../utils/contractUtils';

const ConnectWallet = ({ className = '' }) => {
  const { isConnected, account, connectWallet, disconnectWallet, networkName } = useContext(Web3Context);

  return (
    <div className={className}>
      {isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3"
        >
          <div className="px-4 py-2 bg-dark-lighter rounded-lg text-sm text-gray-300 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>{formatAddress(account)}</span>
            {networkName && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-dark rounded-full">
                {networkName}
              </span>
            )}
          </div>
          <button
            onClick={disconnectWallet}
            className="btn-outline text-sm py-2 px-4"
          >
            Disconnect
          </button>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={connectWallet}
          className="btn-primary text-sm py-2 px-6"
        >
          Connect Wallet
        </motion.button>
      )}
    </div>
  );
};

export default ConnectWallet;
