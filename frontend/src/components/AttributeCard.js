import React from 'react';
import { motion } from 'framer-motion';

const AttributeCard = ({ trait_type, value, rarity = 'common', count, total }) => {
  // Calculate rarity percentage if count and total are provided
  const rarityPercentage = count && total ? ((count / total) * 100).toFixed(1) : null;
  
  // Determine color based on rarity
  const getColorByRarity = (rarityValue) => {
    switch (rarityValue.toLowerCase()) {
      case 'legendary':
        return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      case 'rare':
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'uncommon':
        return 'bg-gradient-to-br from-blue-500 to-teal-500';
      default:
        return 'bg-gradient-to-br from-blue-400 to-indigo-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-light rounded-lg overflow-hidden border border-gray-800"
    >
      <div className={`h-2 ${getColorByRarity(rarity)}`}></div>
      <div className="p-4">
        <p className="text-sm text-gray-400 mb-1">{trait_type}</p>
        <p className="font-medium text-lg">{value}</p>
        
        {rarityPercentage && (
          <div className="mt-2">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-gray-400">Rarity</span>
              <span className={`${
                rarityPercentage < 10 
                  ? 'text-yellow-400' 
                  : rarityPercentage < 30 
                    ? 'text-blue-400' 
                    : 'text-gray-400'
              }`}>
                {rarityPercentage}%
              </span>
            </div>
            <div className="w-full bg-dark rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${getColorByRarity(rarity)}`} 
                style={{ width: `${rarityPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {count && (
          <p className="text-xs text-gray-400 mt-2">
            {count} {parseInt(count) === 1 ? 'item' : 'items'} have this trait
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AttributeCard;
