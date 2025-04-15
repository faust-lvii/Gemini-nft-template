import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const MarketAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d'); // '24h', '7d', '30d', 'all'
  const [marketStats, setMarketStats] = useState({
    totalVolume: 0,
    totalSales: 0,
    averagePrice: 0,
    floorPrice: 0,
    percentChange: 0
  });
  const [topCollections, setTopCollections] = useState([]);
  const [topSales, setTopSales] = useState([]);
  const [trendingNFTs, setTrendingNFTs] = useState([]);
  
  // Generate sample data for demonstration
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate market stats based on time range
      const generateMarketStats = () => {
        const baseVolume = 1250;
        const baseSales = 450;
        const baseAvgPrice = 0.85;
        const baseFloorPrice = 0.12;
        
        let multiplier;
        let changeDirection = Math.random() > 0.5 ? 1 : -1;
        
        switch(timeRange) {
          case '24h':
            multiplier = 0.2;
            break;
          case '7d':
            multiplier = 1;
            break;
          case '30d':
            multiplier = 3.5;
            break;
          case 'all':
            multiplier = 12;
            break;
          default:
            multiplier = 1;
        }
        
        return {
          totalVolume: (baseVolume * multiplier).toFixed(2),
          totalSales: Math.floor(baseSales * multiplier),
          averagePrice: (baseAvgPrice * (1 + (Math.random() * 0.4 - 0.2))).toFixed(2),
          floorPrice: (baseFloorPrice * (1 + (Math.random() * 0.3 - 0.1))).toFixed(2),
          percentChange: (changeDirection * (Math.random() * 15 + 2)).toFixed(1)
        };
      };
      
      // Generate top collections
      const generateTopCollections = () => {
        return Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          name: ['Cosmic Explorers', 'Neon Avatars', 'Digital Dreams', 'Cyber Punks', 'Abstract Worlds'][i],
          image: `https://via.placeholder.com/100x100.png?text=Collection+${i+1}`,
          volume: (Math.random() * 500 + 100).toFixed(2),
          floorPrice: (Math.random() * 0.5 + 0.1).toFixed(2),
          percentChange: (Math.random() * 30 - 10).toFixed(1),
          owners: Math.floor(Math.random() * 1000 + 200),
          items: Math.floor(Math.random() * 5000 + 1000)
        }));
      };
      
      // Generate top sales
      const generateTopSales = () => {
        return Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          nftId: Math.floor(Math.random() * 1000 + 1),
          name: `ModernNFT #${Math.floor(Math.random() * 1000 + 1)}`,
          collection: ['Cosmic Explorers', 'Neon Avatars', 'Digital Dreams', 'Cyber Punks', 'Abstract Worlds'][Math.floor(Math.random() * 5)],
          image: `https://via.placeholder.com/100x100.png?text=NFT+${i+1}`,
          price: (Math.random() * 10 + 1).toFixed(2),
          seller: `0x${Math.random().toString(16).substring(2, 12)}${Math.random().toString(16).substring(2, 12)}`,
          buyer: `0x${Math.random().toString(16).substring(2, 12)}${Math.random().toString(16).substring(2, 12)}`,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()
        }));
      };
      
      // Generate trending NFTs
      const generateTrendingNFTs = () => {
        return Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          nftId: Math.floor(Math.random() * 1000 + 1),
          name: `ModernNFT #${Math.floor(Math.random() * 1000 + 1)}`,
          collection: ['Cosmic Explorers', 'Neon Avatars', 'Digital Dreams', 'Cyber Punks', 'Abstract Worlds'][Math.floor(Math.random() * 5)],
          image: `https://via.placeholder.com/300x300.png?text=NFT+${i+1}`,
          price: (Math.random() * 2 + 0.1).toFixed(2),
          percentChange: (Math.random() * 50 + 10).toFixed(1),
          views: Math.floor(Math.random() * 1000 + 100)
        }));
      };
      
      setMarketStats(generateMarketStats());
      setTopCollections(generateTopCollections());
      setTopSales(generateTopSales());
      setTrendingNFTs(generateTrendingNFTs());
      setIsLoading(false);
    }, 1500);
  }, [timeRange]);
  
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
              <h1 className="text-3xl font-bold mb-2">Market Analytics</h1>
              <p className="text-gray-400">Track NFT market trends and performance</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={() => setTimeRange('24h')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === '24h'
                    ? 'bg-primary text-white'
                    : 'bg-dark-light text-gray-400 hover:text-white'
                }`}
              >
                24h
              </button>
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === '7d'
                    ? 'bg-primary text-white'
                    : 'bg-dark-light text-gray-400 hover:text-white'
                }`}
              >
                7d
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === '30d'
                    ? 'bg-primary text-white'
                    : 'bg-dark-light text-gray-400 hover:text-white'
                }`}
              >
                30d
              </button>
              <button
                onClick={() => setTimeRange('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-dark-light text-gray-400 hover:text-white'
                }`}
              >
                All Time
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Market Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-dark-light rounded-xl p-6"
                >
                  <p className="text-gray-400 text-sm">Total Volume</p>
                  <h3 className="text-2xl font-bold mt-1">{marketStats.totalVolume} ETH</h3>
                  <div className={`flex items-center mt-2 ${
                    parseFloat(marketStats.percentChange) >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {parseFloat(marketStats.percentChange) >= 0 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      )}
                    </svg>
                    <span className="text-sm font-medium">{Math.abs(parseFloat(marketStats.percentChange))}%</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-dark-light rounded-xl p-6"
                >
                  <p className="text-gray-400 text-sm">Total Sales</p>
                  <h3 className="text-2xl font-bold mt-1">{marketStats.totalSales}</h3>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-dark-light rounded-xl p-6"
                >
                  <p className="text-gray-400 text-sm">Average Price</p>
                  <h3 className="text-2xl font-bold mt-1">{marketStats.averagePrice} ETH</h3>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-dark-light rounded-xl p-6"
                >
                  <p className="text-gray-400 text-sm">Floor Price</p>
                  <h3 className="text-2xl font-bold mt-1">{marketStats.floorPrice} ETH</h3>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="bg-dark-light rounded-xl p-6"
                >
                  <p className="text-gray-400 text-sm">Active Wallets</p>
                  <h3 className="text-2xl font-bold mt-1">{Math.floor(Math.random() * 5000 + 1000)}</h3>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Top Collections */}
                <div className="bg-dark-light rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Top Collections</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                          <th className="pb-4 font-medium">#</th>
                          <th className="pb-4 font-medium">Collection</th>
                          <th className="pb-4 font-medium">Volume</th>
                          <th className="pb-4 font-medium">Floor Price</th>
                          <th className="pb-4 font-medium">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topCollections.map((collection, index) => (
                          <tr key={collection.id} className="border-b border-gray-800 last:border-b-0">
                            <td className="py-4 font-medium">{index + 1}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                                  <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <Link to={`/collection/${collection.id}`} className="font-medium hover:text-primary transition-colors">
                                  {collection.name}
                                </Link>
                              </div>
                            </td>
                            <td className="py-4 font-medium">{collection.volume} ETH</td>
                            <td className="py-4">{collection.floorPrice} ETH</td>
                            <td className={`py-4 ${
                              parseFloat(collection.percentChange) >= 0
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}>
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  {parseFloat(collection.percentChange) >= 0 ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  )}
                                </svg>
                                <span>{Math.abs(parseFloat(collection.percentChange))}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/collections" className="text-primary hover:text-primary-dark transition-colors text-sm">
                      View All Collections
                    </Link>
                  </div>
                </div>
                
                {/* Top Sales */}
                <div className="bg-dark-light rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Top Sales</h3>
                  <div className="space-y-4">
                    {topSales.map((sale, index) => (
                      <motion.div
                        key={sale.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center p-3 bg-dark rounded-lg"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                          <img
                            src={sale.image}
                            alt={sale.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <Link to={`/nft/${sale.nftId}`} className="font-medium hover:text-primary transition-colors">
                            {sale.name}
                          </Link>
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <span>{sale.collection}</span>
                            <span className="mx-2">•</span>
                            <span>{formatTimestamp(sale.timestamp)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{sale.price} ETH</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatAddress(sale.buyer)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/activity" className="text-primary hover:text-primary-dark transition-colors text-sm">
                      View All Activity
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Trending NFTs */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Trending NFTs</h3>
                  <Link to="/collection" className="text-primary hover:text-primary-dark transition-colors text-sm">
                    View All
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {trendingNFTs.map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-dark-light rounded-xl overflow-hidden"
                    >
                      <div className="aspect-square bg-dark">
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/nft/${nft.nftId}`} className="font-medium hover:text-primary transition-colors">
                            {nft.name}
                          </Link>
                          <div className={`flex items-center ${
                            parseFloat(nft.percentChange) >= 0
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              {parseFloat(nft.percentChange) >= 0 ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              )}
                            </svg>
                            <span className="text-sm">{Math.abs(parseFloat(nft.percentChange))}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{nft.collection}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400">Price</p>
                            <p className="font-bold">{nft.price} ETH</p>
                          </div>
                          <Link to={`/nft/${nft.nftId}`} className="btn-outline text-xs py-1 px-3">
                            View
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Market Insights */}
              <div className="bg-dark-light rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Market Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-dark rounded-lg p-4">
                    <h4 className="font-medium mb-2">Most Active Buyers</h4>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <a
                              href={`https://etherscan.io/address/0x${Math.random().toString(16).substring(2, 42)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {formatAddress(`0x${Math.random().toString(16).substring(2, 42)}`)}
                            </a>
                          </div>
                          <span className="font-medium">{(Math.random() * 50 + 10).toFixed(1)} ETH</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-dark rounded-lg p-4">
                    <h4 className="font-medium mb-2">Most Active Sellers</h4>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <a
                              href={`https://etherscan.io/address/0x${Math.random().toString(16).substring(2, 42)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {formatAddress(`0x${Math.random().toString(16).substring(2, 42)}`)}
                            </a>
                          </div>
                          <span className="font-medium">{(Math.random() * 50 + 10).toFixed(1)} ETH</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-dark rounded-lg p-4">
                    <h4 className="font-medium mb-2">Fastest Growing Collections</h4>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg overflow-hidden mr-2">
                              <img
                                src={`https://via.placeholder.com/50x50.png?text=C${i+1}`}
                                alt={`Collection ${i+1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link to="/collection" className="hover:text-primary transition-colors">
                              {['Pixel Punks', 'Bored Apes', 'Crypto Kitties'][i]}
                            </Link>
                          </div>
                          <div className="text-green-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            <span>{(Math.random() * 100 + 50).toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-dark rounded-lg p-4">
                    <h4 className="font-medium mb-2">Highest Price Increases</h4>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg overflow-hidden mr-2">
                              <img
                                src={`https://via.placeholder.com/50x50.png?text=NFT${i+1}`}
                                alt={`NFT ${i+1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link to={`/nft/${Math.floor(Math.random() * 1000 + 1)}`} className="hover:text-primary transition-colors">
                              ModernNFT #{Math.floor(Math.random() * 1000 + 1)}
                            </Link>
                          </div>
                          <div className="text-green-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            <span>{(Math.random() * 200 + 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MarketAnalytics;
