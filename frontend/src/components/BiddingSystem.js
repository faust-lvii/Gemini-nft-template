import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import { ethers } from 'ethers';
import LoadingSpinner from './LoadingSpinner';

const BiddingSystem = ({ tokenId, currentPrice = '0.05', minimumBid = '0.01', isForSale = true }) => {
  const { isConnected, account, contract } = useContext(Web3Context);
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bids, setBids] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Generate sample bids for demonstration
  useEffect(() => {
    const generateSampleBids = () => {
      const sampleBids = [
        {
          id: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          bidder: '0x1234567890abcdef1234567890abcdef12345678',
          amount: ethers.utils.parseEther('0.15'),
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        },
        {
          id: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          bidder: '0x2345678901abcdef2345678901abcdef23456789',
          amount: ethers.utils.parseEther('0.12'),
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
        },
        {
          id: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
          bidder: '0x3456789012abcdef3456789012abcdef34567890',
          amount: ethers.utils.parseEther('0.1'),
          timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), // 10 hours ago
        }
      ];
      
      setBids(sampleBids);
      
      // Set a random time left for the auction (between 1 hour and 24 hours)
      const randomHours = 1 + Math.floor(Math.random() * 23);
      setTimeLeft(randomHours * 3600);
    };
    
    generateSampleBids();
    
    // Set up timer to update time left
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) return 0;
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [tokenId]);
  
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
    
    if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Format time left
  const formatTimeLeft = (seconds) => {
    if (seconds <= 0) return 'Auction ended';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle bid amount change
  const handleBidAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setBidAmount(value);
      setError('');
    }
  };
  
  // Handle bid submission
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    
    // Validate bid amount
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }
    
    // Check if bid is higher than current highest bid
    const highestBid = bids.length > 0 
      ? ethers.utils.formatEther(bids[0].amount) 
      : 0;
      
    if (parseFloat(bidAmount) <= parseFloat(highestBid)) {
      setError(`Bid must be higher than the current highest bid (${highestBid} ETH)`);
      return;
    }
    
    // Check if bid is higher than minimum bid
    if (parseFloat(bidAmount) < parseFloat(minimumBid)) {
      setError(`Bid must be at least ${minimumBid} ETH`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, you would call the contract method to place a bid
      // For demonstration, we'll simulate a successful bid
      setTimeout(() => {
        // Create a new bid
        const newBid = {
          id: `0x${Math.random().toString(16).substr(2, 64)}`,
          bidder: account,
          amount: ethers.utils.parseEther(bidAmount),
          timestamp: new Date().toISOString(),
        };
        
        // Add the new bid to the list and sort by amount (highest first)
        const updatedBids = [newBid, ...bids]
          .sort((a, b) => b.amount.gt(a.amount) ? 1 : -1);
        
        setBids(updatedBids);
        setBidAmount('');
        setSuccess('Bid placed successfully!');
        setIsLoading(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }, 1500);
    } catch (err) {
      console.error('Error placing bid:', err);
      setError('Failed to place bid. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Handle "Buy Now" action
  const handleBuyNow = async () => {
    if (!isConnected) {
      setError('Please connect your wallet to buy this NFT');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, you would call the contract method to buy the NFT
      // For demonstration, we'll simulate a successful purchase
      setTimeout(() => {
        setSuccess('NFT purchased successfully!');
        setIsLoading(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }, 1500);
    } catch (err) {
      console.error('Error buying NFT:', err);
      setError('Failed to buy NFT. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Bidding</h3>
      
      {isForSale ? (
        <div className="space-y-6">
          {/* Current Price and Time Left */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Current Price</p>
              <p className="text-2xl font-bold">{currentPrice} ETH</p>
            </div>
            
            <div className="bg-dark rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Auction Ends In</p>
              <p className="text-2xl font-bold">{formatTimeLeft(timeLeft)}</p>
            </div>
          </div>
          
          {/* Bid Form */}
          {isConnected ? (
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label htmlFor="bidAmount" className="block text-sm text-gray-400 mb-1">
                  Your Bid (ETH)
                </label>
                <div className="flex">
                  <input
                    id="bidAmount"
                    type="text"
                    value={bidAmount}
                    onChange={handleBidAmountChange}
                    placeholder={`Minimum bid: ${minimumBid} ETH`}
                    className="flex-grow bg-dark border border-gray-700 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isLoading || timeLeft <= 0}
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors"
                    disabled={isLoading || timeLeft <= 0}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Bidding...</span>
                      </div>
                    ) : (
                      'Place Bid'
                    )}
                  </button>
                </div>
              </div>
              
              {/* Buy Now Option */}
              <div>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Buy Now for ${parseFloat(currentPrice) * 1.5} ETH`
                  )}
                </button>
              </div>
              
              {/* Error and Success Messages */}
              {error && (
                <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
                  {success}
                </div>
              )}
            </form>
          ) : (
            <div className="bg-dark rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-2">Connect your wallet to place a bid</p>
              <button className="btn-primary text-sm py-2">
                Connect Wallet
              </button>
            </div>
          )}
          
          {/* Bid History */}
          <div>
            <h4 className="font-medium text-lg mb-3">Bid History</h4>
            
            {bids.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {bids.map((bid, index) => (
                  <motion.div
                    key={bid.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center justify-between bg-dark rounded-lg p-3 hover:bg-dark-lighter transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <a 
                          href={`https://etherscan.io/address/${bid.bidder}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {formatAddress(bid.bidder)}
                        </a>
                        <p className="text-xs text-gray-400">{formatTimestamp(bid.timestamp)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{ethers.utils.formatEther(bid.amount)} ETH</p>
                      {index === 0 && (
                        <span className="text-xs font-medium text-green-400">Highest Bid</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400">No bids yet. Be the first to bid!</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">This NFT is not currently for sale</p>
          {isConnected && (
            <button className="btn-primary">List for Sale</button>
          )}
        </div>
      )}
    </div>
  );
};

export default BiddingSystem;
