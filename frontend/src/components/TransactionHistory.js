import React from 'react';
import { motion } from 'framer-motion';

const TransactionHistory = ({ transactions = [], isLoading = false }) => {
  // If no transactions are provided, generate some sample data
  const sampleTransactions = [
    {
      id: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      type: 'Mint',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x1234567890abcdef1234567890abcdef12345678',
      timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
      value: '0.05 ETH'
    },
    {
      id: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      type: 'Transfer',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0x2345678901abcdef2345678901abcdef23456789',
      timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
      value: '0 ETH'
    },
    {
      id: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
      type: 'Sale',
      from: '0x2345678901abcdef2345678901abcdef23456789',
      to: '0x3456789012abcdef3456789012abcdef34567890',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
      value: '0.2 ETH'
    }
  ];

  const displayTransactions = transactions.length > 0 ? transactions : sampleTransactions;

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Get icon based on transaction type
  const getTransactionIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'mint':
        return (
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'transfer':
        return (
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        );
      case 'sale':
        return (
          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Transaction History</h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : displayTransactions.length > 0 ? (
        <div className="space-y-4">
          {displayTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center p-3 bg-dark rounded-lg hover:bg-dark-lighter transition-colors"
            >
              {getTransactionIcon(tx.type)}
              
              <div className="ml-3 flex-grow">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{tx.type}</span>
                  <span className="text-sm text-gray-400">{formatTimestamp(tx.timestamp)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-sm">
                    <span className="text-gray-400">From: </span>
                    <a 
                      href={`https://etherscan.io/address/${tx.from}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {formatAddress(tx.from)}
                    </a>
                    <span className="text-gray-400 mx-1">→</span>
                    <span className="text-gray-400">To: </span>
                    <a 
                      href={`https://etherscan.io/address/${tx.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {formatAddress(tx.to)}
                    </a>
                  </div>
                  {tx.value && tx.value !== '0 ETH' && (
                    <span className="text-sm font-medium">{tx.value}</span>
                  )}
                </div>
              </div>
              
              <a 
                href={`https://etherscan.io/tx/${tx.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-gray-400 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">No transactions found for this NFT.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
