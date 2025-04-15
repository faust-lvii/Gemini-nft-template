import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const CollectionComparison = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [comparisonMetrics, setComparisonMetrics] = useState([
    { id: 'volume', name: 'Volume', enabled: true },
    { id: 'floorPrice', name: 'Floor Price', enabled: true },
    { id: 'items', name: 'Items', enabled: true },
    { id: 'owners', name: 'Owners', enabled: true },
    { id: 'sales', name: 'Sales', enabled: true },
    { id: 'avgPrice', name: 'Avg. Price', enabled: true },
    { id: 'marketCap', name: 'Market Cap', enabled: false },
    { id: 'volumeChange', name: '24h % Change', enabled: true }
  ]);
  
  // Generate sample collections for demonstration
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const sampleCollections = Array.from({ length: 20 }, (_, i) => {
        const id = i + 1;
        const name = [
          'Cosmic Explorers', 'Neon Avatars', 'Digital Dreams', 'Cyber Punks', 
          'Abstract Worlds', 'Pixel Heroes', 'Crypto Kitties', 'Modern Art',
          'Space Voyagers', 'Ethereal Beings', 'Mystic Realms', 'Future Visions',
          'Retro Arcade', 'Quantum Creatures', 'Neon City', 'Crypto Legends',
          'Virtual Lands', 'Techno Spirits', 'Astral Entities', 'Digital Nomads'
        ][i];
        
        const volume = Math.random() * 10000 + 500;
        const volumeChange = (Math.random() * 40) - 20; // -20% to +20%
        const floorPrice = Math.random() * 2 + 0.05;
        const items = Math.floor(Math.random() * 9000 + 1000);
        const owners = Math.floor(Math.random() * items * 0.7);
        const sales = Math.floor(Math.random() * 500 + 50);
        const avgPrice = volume / sales;
        const marketCap = floorPrice * items;
        
        return {
          id,
          name,
          image: `https://via.placeholder.com/100x100.png?text=Collection+${id}`,
          volume: volume.toFixed(2),
          volumeChange: volumeChange.toFixed(1),
          floorPrice: floorPrice.toFixed(3),
          items,
          owners,
          sales,
          avgPrice: avgPrice.toFixed(2),
          marketCap: marketCap.toFixed(2)
        };
      });
      
      setCollections(sampleCollections);
      setSearchResults(sampleCollections);
      setIsLoading(false);
    }, 1500);
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults(collections);
    } else {
      const filtered = collections.filter(collection => 
        collection.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };
  
  // Handle collection selection
  const handleCollectionSelect = (collection) => {
    if (selectedCollections.some(c => c.id === collection.id)) {
      // Remove if already selected
      setSelectedCollections(selectedCollections.filter(c => c.id !== collection.id));
    } else {
      // Add if not selected (max 3)
      if (selectedCollections.length < 3) {
        setSelectedCollections([...selectedCollections, collection]);
      }
    }
  };
  
  // Handle metric toggle
  const handleMetricToggle = (metricId) => {
    setComparisonMetrics(comparisonMetrics.map(metric => 
      metric.id === metricId ? { ...metric, enabled: !metric.enabled } : metric
    ));
  };
  
  // Format number with commas
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString();
  };
  
  // Get color class based on value (for percentage changes)
  const getColorClass = (value) => {
    const numValue = parseFloat(value);
    if (numValue > 0) return 'text-green-500';
    if (numValue < 0) return 'text-red-500';
    return 'text-gray-400';
  };
  
  // Get the enabled metrics
  const enabledMetrics = comparisonMetrics.filter(metric => metric.enabled);
  
  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Collection Comparison</h1>
            <p className="text-gray-400">Compare metrics across different NFT collections</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Collection Search */}
                <div className="lg:col-span-1">
                  <div className="bg-dark-light rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Select Collections</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Choose up to 3 collections to compare
                    </p>
                    
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="w-full bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Search collections..."
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                      {searchResults.length > 0 ? (
                        searchResults.map(collection => (
                          <div
                            key={collection.id}
                            onClick={() => handleCollectionSelect(collection)}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedCollections.some(c => c.id === collection.id)
                                ? 'bg-primary/20 border border-primary/40'
                                : 'bg-dark hover:bg-dark-lighter border border-transparent'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                              <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium">{collection.name}</p>
                              <div className="flex items-center text-sm text-gray-400">
                                <span>Floor: {collection.floorPrice} ETH</span>
                                <span className="mx-2">•</span>
                                <span>Items: {formatNumber(collection.items)}</span>
                              </div>
                            </div>
                            {selectedCollections.some(c => c.id === collection.id) && (
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No collections found</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Metrics Selection */}
                  <div className="bg-dark-light rounded-xl p-6 mt-6">
                    <h3 className="text-xl font-bold mb-4">Metrics</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Select metrics to compare
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {comparisonMetrics.map(metric => (
                        <div
                          key={metric.id}
                          onClick={() => handleMetricToggle(metric.id)}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                            metric.enabled
                              ? 'bg-primary/20 border border-primary/40'
                              : 'bg-dark hover:bg-dark-lighter border border-transparent'
                          }`}
                        >
                          <div className="flex-grow">
                            <p className="text-sm font-medium">{metric.name}</p>
                          </div>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                            metric.enabled
                              ? 'bg-primary border-primary'
                              : 'border-gray-600'
                          }`}>
                            {metric.enabled && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Comparison Table */}
                <div className="lg:col-span-2">
                  <div className="bg-dark-light rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-6">Comparison</h3>
                    
                    {selectedCollections.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                              <th className="pb-4 font-medium">Collection</th>
                              {enabledMetrics.map(metric => (
                                <th key={metric.id} className="pb-4 font-medium">{metric.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {selectedCollections.map(collection => (
                              <tr key={collection.id} className="border-b border-gray-800 last:border-b-0">
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
                                
                                {enabledMetrics.map(metric => (
                                  <td key={metric.id} className="py-4">
                                    {metric.id === 'volumeChange' ? (
                                      <div className={`flex items-center ${getColorClass(collection[metric.id])}`}>
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          {parseFloat(collection[metric.id]) >= 0 ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                          ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          )}
                                        </svg>
                                        <span>{Math.abs(parseFloat(collection[metric.id]))}%</span>
                                      </div>
                                    ) : metric.id === 'volume' || metric.id === 'marketCap' || metric.id === 'avgPrice' ? (
                                      <span>{formatNumber(collection[metric.id])} ETH</span>
                                    ) : metric.id === 'floorPrice' ? (
                                      <span>{collection[metric.id]} ETH</span>
                                    ) : (
                                      <span>{formatNumber(collection[metric.id])}</span>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-dark rounded-xl">
                        <div className="w-16 h-16 bg-dark-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <p className="text-gray-400 mb-2">No collections selected</p>
                        <p className="text-sm text-gray-500 mb-6">
                          Select up to 3 collections from the list to compare them
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Visualization */}
                  {selectedCollections.length > 0 && (
                    <div className="bg-dark-light rounded-xl p-6 mt-6">
                      <h3 className="text-xl font-bold mb-6">Visual Comparison</h3>
                      
                      <div className="space-y-6">
                        {/* Volume Bar Chart */}
                        <div>
                          <h4 className="text-lg font-medium mb-4">Volume (ETH)</h4>
                          <div className="space-y-4">
                            {selectedCollections.map(collection => {
                              const maxVolume = Math.max(...selectedCollections.map(c => parseFloat(c.volume)));
                              const percentage = (parseFloat(collection.volume) / maxVolume) * 100;
                              
                              return (
                                <div key={collection.id}>
                                  <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm">{collection.name}</p>
                                    <p className="text-sm font-medium">{formatNumber(collection.volume)} ETH</p>
                                  </div>
                                  <div className="w-full bg-dark rounded-full h-4">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                      className="bg-primary h-4 rounded-full"
                                    ></motion.div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Floor Price Bar Chart */}
                        <div>
                          <h4 className="text-lg font-medium mb-4">Floor Price (ETH)</h4>
                          <div className="space-y-4">
                            {selectedCollections.map(collection => {
                              const maxFloorPrice = Math.max(...selectedCollections.map(c => parseFloat(c.floorPrice)));
                              const percentage = (parseFloat(collection.floorPrice) / maxFloorPrice) * 100;
                              
                              return (
                                <div key={collection.id}>
                                  <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm">{collection.name}</p>
                                    <p className="text-sm font-medium">{collection.floorPrice} ETH</p>
                                  </div>
                                  <div className="w-full bg-dark rounded-full h-4">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                      className="bg-purple-500 h-4 rounded-full"
                                    ></motion.div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Items vs Owners */}
                        <div>
                          <h4 className="text-lg font-medium mb-4">Items vs Owners</h4>
                          <div className="space-y-4">
                            {selectedCollections.map(collection => {
                              const maxItems = Math.max(...selectedCollections.map(c => c.items));
                              const itemsPercentage = (collection.items / maxItems) * 100;
                              const ownersPercentage = (collection.owners / collection.items) * 100;
                              
                              return (
                                <div key={collection.id}>
                                  <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm">{collection.name}</p>
                                    <div className="flex items-center space-x-2">
                                      <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                                      <p className="text-xs text-gray-400">Items: {formatNumber(collection.items)}</p>
                                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                      <p className="text-xs text-gray-400">Owners: {formatNumber(collection.owners)}</p>
                                    </div>
                                  </div>
                                  <div className="w-full bg-dark rounded-full h-4 mb-1">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${itemsPercentage}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                      className="bg-blue-500 h-4 rounded-full"
                                    ></motion.div>
                                  </div>
                                  <div className="w-full bg-dark rounded-full h-4">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${ownersPercentage}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                      className="bg-green-500 h-4 rounded-full"
                                    ></motion.div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Top Collections */}
              <div className="bg-dark-light rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Top Collections</h3>
                  <Link to="/collections" className="text-primary hover:text-primary-dark transition-colors text-sm">
                    View All
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                        <th className="pb-4 font-medium">#</th>
                        <th className="pb-4 font-medium">Collection</th>
                        <th className="pb-4 font-medium">Volume</th>
                        <th className="pb-4 font-medium">24h %</th>
                        <th className="pb-4 font-medium">Floor Price</th>
                        <th className="pb-4 font-medium">Owners</th>
                        <th className="pb-4 font-medium">Items</th>
                        <th className="pb-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {collections.slice(0, 5).map((collection, index) => (
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
                          <td className="py-4 font-medium">{formatNumber(collection.volume)} ETH</td>
                          <td className={`py-4 ${getColorClass(collection.volumeChange)}`}>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {parseFloat(collection.volumeChange) >= 0 ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                )}
                              </svg>
                              <span>{Math.abs(parseFloat(collection.volumeChange))}%</span>
                            </div>
                          </td>
                          <td className="py-4">{collection.floorPrice} ETH</td>
                          <td className="py-4">{formatNumber(collection.owners)}</td>
                          <td className="py-4">{formatNumber(collection.items)}</td>
                          <td className="py-4">
                            <button
                              onClick={() => handleCollectionSelect(collection)}
                              className={`px-3 py-1 rounded text-xs font-medium ${
                                selectedCollections.some(c => c.id === collection.id)
                                  ? 'bg-primary/20 text-primary border border-primary/40'
                                  : 'bg-dark hover:bg-dark-lighter text-gray-300'
                              }`}
                            >
                              {selectedCollections.some(c => c.id === collection.id) ? 'Selected' : 'Compare'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionComparison;
