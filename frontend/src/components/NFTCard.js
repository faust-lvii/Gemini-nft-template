import React from 'react';
import { motion } from 'framer-motion';

const NFTCard = ({ nft, index = 0 }) => {
  // Determine rarity styling
  const getRarityStyle = () => {
    const rarityAttribute = nft.attributes?.find(attr => attr.trait_type === 'Rarity');
    const rarity = rarityAttribute ? rarityAttribute.value.toLowerCase() : 'common';
    
    switch (rarity) {
      case 'legendary':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          badge: 'bg-yellow-500 text-black',
          badgeText: 'LEGENDARY'
        };
      case 'rare':
        return {
          gradient: 'from-purple-500 to-pink-500',
          badge: 'bg-purple-500 text-white',
          badgeText: 'RARE'
        };
      default:
        return {
          gradient: 'from-blue-500 to-purple-500',
          badge: '',
          badgeText: ''
        };
    }
  };

  const rarityStyle = getRarityStyle();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card overflow-hidden"
    >
      <div className={`aspect-square bg-gradient-to-br ${rarityStyle.gradient} relative`}>
        {nft.image ? (
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white">?</span>
          </div>
        )}
        
        {rarityStyle.badgeText && (
          <div className={`absolute top-2 right-2 ${rarityStyle.badge} text-xs font-bold px-2 py-1 rounded-md`}>
            {rarityStyle.badgeText}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold mb-2">{nft.name}</h3>
        {nft.attributes && (
          <div className="space-y-1">
            {nft.attributes.map((attr, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-gray-400">{attr.trait_type}:</span>
                <span className="font-medium">{attr.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NFTCard;
