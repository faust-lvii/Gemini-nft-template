import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatAddress } from '../utils/contractUtils';

const BiddingHistory = ({ nftId, currentPrice }) => {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  
  // Generate sample bid history data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate random bid history
      const now = new Date();
      const sampleBids = Array.from({ length: 8 }, (_, i) => {
        const bidTime = new Date(now.getTime() - (i + 1) * 3600000 * (Math.random() * 5 + 1));
        const bidAmount = currentPrice * (0.7 + (Math.random() * 0.6));
        
        return {
          id: `bid-${i + 1}`,
          bidder: `0x${Math.random().toString(16).substring(2, 12)}${Math.random().toString(16).substring(2, 12)}`,
          amount: bidAmount.toFixed(3),
          timestamp: bidTime.toISOString(),
          status: i === 0 ? 'highest' : 'outbid'
        };
      });
      
      // Sort bids by timestamp (newest first by default)
      const sortedBids = sampleBids.sort((a, b) => {
        return sortOrder === 'desc' 
          ? new Date(b.timestamp) - new Date(a.timestamp)
          : new Date(a.timestamp) - new Date(b.timestamp);
      });
      
      setBids(sortedBids);
      setIsLoading(false);
    }, 1000);
  }, [nftId, currentPrice, sortOrder]);
  
  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };
  
  // Get status badge for bid
  const getBidStatusBadge = (status) => {
    switch (status) {
      case 'highest':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Highest
          </span>
        );
      case 'outbid':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
            Outbid
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
            {status}
          </span>
        );
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-light rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Bid History</h3>
        <button 
          onClick={toggleSortOrder}
          className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          <span className="mr-1">{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {sortOrder === 'desc' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            )}
          </svg>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : bids.length > 0 ? (
        <div className="space-y-4">
          {bids.map((bid, index) => (
            <motion.div
              key={bid.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-dark rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <a
                      href={`https://etherscan.io/address/${bid.bidder}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {formatAddress(bid.bidder)}
                    </a>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{formatTimestamp(bid.timestamp)}</span>
                  </div>
                  <p className="text-lg font-bold mt-1">{bid.amount} ETH</p>
                </div>
              </div>
              
              <div className="flex items-center">
                {getBidStatusBadge(bid.status)}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No bids have been placed yet</p>
          <p className="text-sm text-gray-500 mt-2">Be the first to place a bid on this NFT</p>
        </div>
      )}
    </motion.div>
  );
};

export default BiddingHistory;
