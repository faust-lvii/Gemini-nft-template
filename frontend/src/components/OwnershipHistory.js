import React from 'react';
import { motion } from 'framer-motion';
import { formatAddress } from '../utils/contractUtils';

const OwnershipHistory = ({ history = [], isLoading = false }) => {
  // If no history is provided, generate some sample data
  const sampleHistory = [
    {
      id: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x1234567890abcdef1234567890abcdef12345678',
      timestamp: new Date(Date.now() - 3600000 * 24 * 30).toISOString(), // 30 days ago
      type: 'Mint'
    },
    {
      id: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0x2345678901abcdef2345678901abcdef23456789',
      timestamp: new Date(Date.now() - 3600000 * 24 * 15).toISOString(), // 15 days ago
      type: 'Transfer'
    },
    {
      id: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
      from: '0x2345678901abcdef2345678901abcdef23456789',
      to: '0x3456789012abcdef3456789012abcdef34567890',
      timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
      type: 'Sale',
      value: '0.2 ETH'
    }
  ];

  const displayHistory = history.length > 0 ? history : sampleHistory;

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-6">Ownership History</h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : displayHistory.length > 0 ? (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-1 bottom-0 w-0.5 bg-gray-700"></div>
          
          {/* Timeline items */}
          <div className="space-y-6">
            {displayHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex"
              >
                {/* Timeline dot */}
                <div className="relative flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    item.type === 'Mint' 
                      ? 'bg-green-500/20' 
                      : item.type === 'Sale' 
                        ? 'bg-purple-500/20' 
                        : 'bg-blue-500/20'
                  }`}>
                    {item.type === 'Mint' ? (
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    ) : item.type === 'Sale' ? (
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="ml-6 flex-grow">
                  <div className="bg-dark p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        item.type === 'Mint' 
                          ? 'bg-green-500/20 text-green-400' 
                          : item.type === 'Sale' 
                            ? 'bg-purple-500/20 text-purple-400' 
                            : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-400">{formatTimestamp(item.timestamp)}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">From:</span>
                        <a 
                          href={`https://etherscan.io/address/${item.from}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          {formatAddress(item.from)}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">To:</span>
                        <a 
                          href={`https://etherscan.io/address/${item.to}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          {formatAddress(item.to)}
                        </a>
                      </div>
                      
                      {item.value && (
                        <div className="flex items-center">
                          <span className="text-gray-400 text-sm mr-2">Value:</span>
                          <span className="text-sm font-medium">{item.value}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center pt-1">
                        <a 
                          href={`https://etherscan.io/tx/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center"
                        >
                          View Transaction
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">No ownership history found for this NFT.</p>
        </div>
      )}
    </div>
  );
};

export default OwnershipHistory;
