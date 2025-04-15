import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NFTCard from '../components/NFTCard';
import CollectionFilter from '../components/CollectionFilter';
import LoadingSpinner from '../components/LoadingSpinner';

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
          <CollectionFilter 
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* NFT Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : filteredNFTs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredNFTs.map((nft, index) => (
                <NFTCard key={nft.id} nft={nft} index={index} />
              ))}
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
