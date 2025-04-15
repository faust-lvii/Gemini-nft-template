import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const CreatorDashboard = () => {
  const { isConnected, account } = useContext(Web3Context);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalNFTs: 0,
    totalSales: 0,
    totalRevenue: 0,
    uniqueOwners: 0
  });
  const [collections, setCollections] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  
  // Generate sample data for demonstration
  useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Sample stats
        setStats({
          totalNFTs: 100,
          totalSales: 45,
          totalRevenue: 12.5,
          uniqueOwners: 32
        });
        
        // Sample collections
        setCollections([
          {
            id: 1,
            name: 'Modern Art Collection',
            image: 'https://via.placeholder.com/500x500.png?text=Collection+1',
            totalItems: 50,
            itemsSold: 28,
            floorPrice: 0.15,
            totalVolume: 8.2
          },
          {
            id: 2,
            name: 'Pixel Avatars',
            image: 'https://via.placeholder.com/500x500.png?text=Collection+2',
            totalItems: 30,
            itemsSold: 12,
            floorPrice: 0.08,
            totalVolume: 2.8
          },
          {
            id: 3,
            name: 'Abstract Worlds',
            image: 'https://via.placeholder.com/500x500.png?text=Collection+3',
            totalItems: 20,
            itemsSold: 5,
            floorPrice: 0.25,
            totalVolume: 1.5
          }
        ]);
        
        // Sample recent sales
        setRecentSales([
          {
            id: 1,
            nftId: 12,
            nftName: 'ModernNFT #12',
            image: 'https://via.placeholder.com/500x500.png?text=NFT+12',
            price: 0.35,
            buyer: '0x1234567890abcdef1234567890abcdef12345678',
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
          },
          {
            id: 2,
            nftId: 24,
            nftName: 'ModernNFT #24',
            image: 'https://via.placeholder.com/500x500.png?text=NFT+24',
            price: 0.18,
            buyer: '0x2345678901abcdef2345678901abcdef23456789',
            timestamp: new Date(Date.now() - 3600000 * 8).toISOString() // 8 hours ago
          },
          {
            id: 3,
            nftId: 31,
            nftName: 'ModernNFT #31',
            image: 'https://via.placeholder.com/500x500.png?text=NFT+31',
            price: 0.22,
            buyer: '0x3456789012abcdef3456789012abcdef34567890',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
          }
        ]);
        
        setIsLoading(false);
      }, 1500);
    }
  }, [isConnected]);
  
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
  
  // Render content based on active tab
  const renderTabContent = () => {
    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-dark-lighter rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Connect your wallet to access your creator dashboard and manage your NFT collections.
          </p>
          <button className="btn-primary">
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
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-light rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total NFTs</p>
                    <h3 className="text-3xl font-bold mt-1">{stats.totalNFTs}</h3>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-dark-light rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Sales</p>
                    <h3 className="text-3xl font-bold mt-1">{stats.totalSales}</h3>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-dark-light rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <h3 className="text-3xl font-bold mt-1">{stats.totalRevenue} ETH</h3>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-dark-light rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Unique Owners</p>
                    <h3 className="text-3xl font-bold mt-1">{stats.uniqueOwners}</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Recent Sales */}
            <div className="bg-dark-light rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recent Sales</h3>
                <button className="text-sm text-primary hover:text-primary-dark transition-colors">
                  View All
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="pb-4 font-medium">NFT</th>
                      <th className="pb-4 font-medium">Price</th>
                      <th className="pb-4 font-medium">Buyer</th>
                      <th className="pb-4 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="border-t border-gray-800">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                              <img
                                src={sale.image}
                                alt={sale.nftName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link to={`/nft/${sale.nftId}`} className="font-medium hover:text-primary transition-colors">
                              {sale.nftName}
                            </Link>
                          </div>
                        </td>
                        <td className="py-4 font-medium">{sale.price} ETH</td>
                        <td className="py-4">
                          <a
                            href={`https://etherscan.io/address/${sale.buyer}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {formatAddress(sale.buyer)}
                          </a>
                        </td>
                        <td className="py-4 text-gray-400">{formatTimestamp(sale.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Collections */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Your Collections</h3>
                <Link to="/create-collection" className="btn-primary text-sm py-1 px-4">
                  Create New
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-dark-light rounded-xl overflow-hidden"
                  >
                    <div className="aspect-video bg-dark">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold mb-2">{collection.name}</h4>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Items</p>
                          <p className="font-medium">{collection.totalItems}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Floor Price</p>
                          <p className="font-medium">{collection.floorPrice} ETH</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Items Sold</p>
                          <p className="font-medium">{collection.itemsSold}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Volume</p>
                          <p className="font-medium">{collection.totalVolume} ETH</p>
                        </div>
                      </div>
                      <Link to={`/collection/${collection.id}`} className="btn-outline text-sm py-1 w-full">
                        Manage Collection
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <div className="bg-dark-light rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Sales Performance</h3>
              <div className="h-80 flex items-center justify-center">
                <p className="text-gray-400">Analytics charts will be displayed here</p>
              </div>
            </div>
          </div>
        );
      
      case 'create':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Create NFT</h2>
            <div className="bg-dark-light rounded-xl p-6">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    NFT Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter NFT name"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter NFT description"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Upload Image
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-400 mb-2">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-gray-500">Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM. Max size: 50MB.</p>
                    <input type="file" className="hidden" />
                    <button className="btn-outline mt-4">
                      Browse Files
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Attributes
                  </label>
                  <div className="space-y-3">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        className="flex-1 bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Trait Type (e.g. Color)"
                      />
                      <input
                        type="text"
                        className="flex-1 bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Value (e.g. Blue)"
                      />
                    </div>
                    <button className="text-sm text-primary hover:text-primary-dark transition-colors">
                      + Add Attribute
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">
                    Price (ETH)
                  </label>
                  <input
                    type="number"
                    id="price"
                    step="0.01"
                    min="0"
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.05"
                  />
                </div>
                
                <div>
                  <label htmlFor="collection" className="block text-sm font-medium text-gray-400 mb-1">
                    Collection
                  </label>
                  <select
                    id="collection"
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a collection</option>
                    {collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="btn-primary w-full">
                    Create NFT
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Creator Settings</h2>
            <div className="bg-dark-light rounded-xl p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Creator Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="creatorName" className="block text-sm font-medium text-gray-400 mb-1">
                      Creator Name
                    </label>
                    <input
                      type="text"
                      id="creatorName"
                      className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your creator name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-400 mb-1">
                      Twitter
                    </label>
                    <input
                      type="text"
                      id="twitter"
                      className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="@yourusername"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Royalties</h3>
                <div>
                  <label htmlFor="royalties" className="block text-sm font-medium text-gray-400 mb-1">
                    Royalty Percentage (%)
                  </label>
                  <input
                    type="number"
                    id="royalties"
                    min="0"
                    max="15"
                    step="0.1"
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="5.0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You will receive this percentage of the sale price each time one of your NFTs is sold on the secondary market.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="btn-primary">
                  Save Settings
                </button>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
              <p className="text-gray-400">Manage your NFT collections and track performance</p>
            </div>
            
            {isConnected && (
              <div className="mt-4 md:mt-0">
                <Link to="/create-nft" className="btn-primary">
                  Create New NFT
                </Link>
              </div>
            )}
          </div>
          
          {isConnected && (
            <div className="mb-8">
              <div className="border-b border-gray-800">
                <nav className="flex flex-wrap space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'overview'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'analytics'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('create')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'create'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Create NFT
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
          )}
          
          <div>
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
