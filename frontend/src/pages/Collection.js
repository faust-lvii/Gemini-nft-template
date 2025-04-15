import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Collection = () => {
  const [nfts, setNfts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Generate sample NFT data for demonstration
  useEffect(() => {
    const generateNFTs = () => {
      const traits = ['Cosmic', 'Digital', 'Neon', 'Cyber', 'Abstract', 'Geometric', 'Pixel', 'Glitch'];
      const colors = ['Red', 'Blue', 'Green', 'Purple', 'Gold', 'Silver', 'Rainbow', 'Monochrome'];
      const backgrounds = ['Space', 'Grid', 'Void', 'Circuit', 'Gradient', 'Particles', 'Matrix', 'Nebula'];
      
      const sampleNFTs = Array.from({ length: 20 }, (_, i) => {
        const trait = traits[Math.floor(Math.random() * traits.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        
        return {
          id: i + 1,
          name: `ModernNFT #${i + 1}`,
          image: `https://via.placeholder.com/500x500.png?text=NFT+${i + 1}`,
          attributes: [
            { trait_type: 'Type', value: trait },
            { trait_type: 'Color', value: color },
            { trait_type: 'Background', value: background },
            { trait_type: 'Rarity', value: Math.random() < 0.2 ? 'Legendary' : Math.random() < 0.4 ? 'Rare' : 'Common' }
          ]
        };
      });
      
      setNfts(sampleNFTs);
      setIsLoading(false);
    };
    
    // Simulate loading delay
    setTimeout(generateNFTs, 1000);
  }, []);

  // Filter NFTs based on selected filter and search term
  const filteredNFTs = nfts.filter(nft => {
    // Filter by rarity if not 'all'
    if (filter !== 'all') {
      const rarityAttribute = nft.attributes.find(attr => attr.trait_type === 'Rarity');
      if (!rarityAttribute || rarityAttribute.value.toLowerCase() !== filter.toLowerCase()) {
        return false;
      }
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      // Check if name contains search term
      if (nft.name.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check if any attribute value contains search term
      return nft.attributes.some(attr => 
        attr.value.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="mb-4">
              <span className="text-gradient">NFT</span> Collection
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Browse through our unique collection of digital art pieces. Each NFT is one-of-a-kind with its own set of traits and attributes.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-dark-light rounded-xl p-6 mb-8 border border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('common')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'common'
                      ? 'bg-primary text-white'
                      : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                  }`}
                >
                  Common
                </button>
                <button
                  onClick={() => setFilter('rare')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'rare'
                      ? 'bg-primary text-white'
                      : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                  }`}
                >
                  Rare
                </button>
                <button
                  onClick={() => setFilter('legendary')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'legendary'
                      ? 'bg-primary text-white'
                      : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                  }`}
                >
                  Legendary
                </button>
              </div>
              
              <div className="relative flex-grow md:max-w-xs">
                <input
                  type="text"
                  placeholder="Search by name or trait..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-dark-lighter border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredNFTs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredNFTs.map((nft) => {
                // Determine background gradient based on rarity
                const rarityAttribute = nft.attributes.find(attr => attr.trait_type === 'Rarity');
                const rarity = rarityAttribute ? rarityAttribute.value.toLowerCase() : 'common';
                
                let bgGradient = 'from-blue-500 to-purple-500'; // Common
                if (rarity === 'rare') {
                  bgGradient = 'from-purple-500 to-pink-500';
                } else if (rarity === 'legendary') {
                  bgGradient = 'from-yellow-400 to-orange-500';
                }
                
                return (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="card overflow-hidden"
                  >
                    <div className={`aspect-square bg-gradient-to-br ${bgGradient} relative`}>
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                      />
                      {rarity === 'legendary' && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-xs font-bold text-black px-2 py-1 rounded-md">
                          LEGENDARY
                        </div>
                      )}
                      {rarity === 'rare' && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-xs font-bold text-white px-2 py-1 rounded-md">
                          RARE
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{nft.name}</h3>
                      <div className="space-y-1">
                        {nft.attributes.map((attr, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span className="text-gray-400">{attr.trait_type}:</span>
                            <span className="font-medium">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No NFTs found matching your criteria.</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}
                className="mt-4 btn-outline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Collection;
