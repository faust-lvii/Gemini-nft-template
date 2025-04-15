import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import { NotificationContext } from '../utils/NotificationContext';
import { Link } from 'react-router-dom';
import NFTCard from '../components/NFTCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatAddress } from '../utils/contractUtils';

const UserProfile = () => {
  const { isConnected, account, connectWallet } = useContext(Web3Context);
  const { notifications } = useContext(NotificationContext);
  const [activeTab, setActiveTab] = useState('nfts');
  const [userNFTs, setUserNFTs] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate sample data for demonstration
  useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      
      // Generate sample NFTs
      const sampleNFTs = Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        name: `ModernNFT #${i + 1}`,
        image: `https://via.placeholder.com/500x500.png?text=NFT+${i + 1}`,
        attributes: [
          { trait_type: 'Type', value: ['Cosmic', 'Digital', 'Neon', 'Cyber'][i % 4] },
          { trait_type: 'Color', value: ['Red', 'Blue', 'Green', 'Purple'][i % 4] },
          { trait_type: 'Background', value: ['Space', 'Grid', 'Void', 'Circuit'][i % 4] },
          { trait_type: 'Rarity', value: i === 0 ? 'Legendary' : i === 1 ? 'Rare' : 'Common' }
        ]
      }));
      
      // Generate sample bids
      const sampleBids = Array.from({ length: 3 }, (_, i) => ({
        id: `bid-${i + 1}`,
        nftId: i + 5,
        nftName: `ModernNFT #${i + 5}`,
        image: `https://via.placeholder.com/500x500.png?text=NFT+${i + 5}`,
        amount: (0.1 + i * 0.05).toFixed(2),
        timestamp: new Date(Date.now() - 3600000 * (i + 1)).toISOString(),
        status: i === 0 ? 'active' : i === 1 ? 'outbid' : 'won'
      }));
      
      // Generate sample activity
      const sampleActivity = [
        {
          id: 'activity-1',
          type: 'mint',
          nftId: 1,
          nftName: 'ModernNFT #1',
          timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
          data: { price: '0.05' }
        },
        {
          id: 'activity-2',
          type: 'purchase',
          nftId: 2,
          nftName: 'ModernNFT #2',
          timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          data: { price: '0.15', seller: '0x1234567890abcdef1234567890abcdef12345678' }
        },
        {
          id: 'activity-3',
          type: 'bid',
          nftId: 5,
          nftName: 'ModernNFT #5',
          timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
          data: { price: '0.1' }
        },
        {
          id: 'activity-4',
          type: 'transfer',
          nftId: 3,
          nftName: 'ModernNFT #3',
          timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
          data: { from: '0x2345678901abcdef2345678901abcdef23456789', to: account }
        }
      ];
      
      setUserNFTs(sampleNFTs);
      setUserBids(sampleBids);
      setUserActivity(sampleActivity);
      setIsLoading(false);
    }
  }, [isConnected, account]);
  
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
  
  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'mint':
        return (
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'purchase':
        return (
          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'bid':
        return (
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'transfer':
        return (
          <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  // Get bid status badge
  const getBidStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
            Active
          </span>
        );
      case 'outbid':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
            Outbid
          </span>
        );
      case 'won':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Won
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
  
  // Render content based on active tab
  const renderTabContent = () => {
    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-dark-lighter rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Connect your wallet to view your profile, NFTs, bids, and activity.
          </p>
          <button onClick={connectWallet} className="btn-primary">
            Connect Wallet
          </button>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      );
    }
    
    switch (activeTab) {
      case 'nfts':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your NFTs</h2>
            {userNFTs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userNFTs.map((nft, index) => (
                  <NFTCard key={nft.id} nft={nft} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-dark-light rounded-xl">
                <p className="text-gray-400 mb-4">You don't own any NFTs yet</p>
                <Link to="/mint" className="btn-primary">
                  Mint Your First NFT
                </Link>
              </div>
            )}
          </div>
        );
      
      case 'bids':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Bids</h2>
            {userBids.length > 0 ? (
              <div className="space-y-4">
                {userBids.map((bid) => (
                  <motion.div
                    key={bid.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-light rounded-xl overflow-hidden flex flex-col md:flex-row"
                  >
                    <div className="w-full md:w-40 h-40 bg-dark">
                      <img
                        src={bid.image}
                        alt={bid.nftName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link to={`/nft/${bid.nftId}`} className="text-lg font-bold hover:text-primary transition-colors">
                            {bid.nftName}
                          </Link>
                          {getBidStatusBadge(bid.status)}
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Bid placed: {formatTimestamp(bid.timestamp)}
                        </p>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-sm text-gray-400">Your bid</p>
                          <p className="text-xl font-bold">{bid.amount} ETH</p>
                        </div>
                        <div className="flex space-x-2">
                          {bid.status === 'active' && (
                            <button className="btn-outline text-sm py-1 px-3">
                              Increase Bid
                            </button>
                          )}
                          <Link to={`/nft/${bid.nftId}`} className="btn-primary text-sm py-1 px-3">
                            View NFT
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-dark-light rounded-xl">
                <p className="text-gray-400 mb-4">You haven't placed any bids yet</p>
                <Link to="/collection" className="btn-primary">
                  Explore Collection
                </Link>
              </div>
            )}
          </div>
        );
      
      case 'activity':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Activity</h2>
            {userActivity.length > 0 ? (
              <div className="bg-dark-light rounded-xl p-6">
                <div className="space-y-6">
                  {userActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start"
                    >
                      {getActivityIcon(activity.type)}
                      
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link to={`/nft/${activity.nftId}`} className="font-medium hover:text-primary transition-colors">
                              {activity.nftName}
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">
                              {activity.type === 'mint' && `Minted for ${activity.data.price} ETH`}
                              {activity.type === 'purchase' && `Purchased for ${activity.data.price} ETH from ${formatAddress(activity.data.seller)}`}
                              {activity.type === 'bid' && `Placed a bid of ${activity.data.price} ETH`}
                              {activity.type === 'transfer' && `Received from ${formatAddress(activity.data.from)}`}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-dark-light rounded-xl">
                <p className="text-gray-400">No activity yet</p>
              </div>
            )}
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="bg-dark-light rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Wallet Information</h3>
                <div className="bg-dark rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
                      <p className="font-mono">{account}</p>
                    </div>
                    <button className="btn-outline mt-4 md:mt-0 text-sm py-1">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-dark rounded-lg p-4">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-dark-lighter rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between bg-dark rounded-lg p-4">
                    <div>
                      <p className="font-medium">Browser Notifications</p>
                      <p className="text-sm text-gray-400">Receive notifications in your browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-dark-lighter rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between bg-dark rounded-lg p-4">
                    <div>
                      <p className="font-medium">Bid Notifications</p>
                      <p className="text-sm text-gray-400">Get notified about bids on your NFTs</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-dark-lighter rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Display Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-dark rounded-lg p-4">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-400">Toggle between light and dark mode</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-dark-lighter rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isConnected && (
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Your Profile</h1>
                    <p className="text-gray-400 font-mono">{formatAddress(account)}</p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Link to="/mint" className="btn-primary">
                    Mint New NFT
                  </Link>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="border-b border-gray-800">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('nfts')}
                      className={`py-4 px-1 font-medium text-sm border-b-2 ${
                        activeTab === 'nfts'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      NFTs ({userNFTs.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('bids')}
                      className={`py-4 px-1 font-medium text-sm border-b-2 ${
                        activeTab === 'bids'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      Bids ({userBids.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('activity')}
                      className={`py-4 px-1 font-medium text-sm border-b-2 ${
                        activeTab === 'activity'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      Activity
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`py-4 px-1 font-medium text-sm border-b-2 ${
                        activeTab === 'settings'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      Settings
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
