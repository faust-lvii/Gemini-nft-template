import React from 'react';
import { motion } from 'framer-motion';

const RarityScore = ({ attributes = [], collectionSize = 1000 }) => {
  // Calculate rarity score based on attributes
  // This is a simplified implementation - in a real application, you would use actual rarity data
  const calculateRarityScore = () => {
    if (!attributes || attributes.length === 0) return 0;
    
    // Generate random rarity scores for each attribute
    const attributeScores = attributes.map(attr => {
      // Simulate rarity percentages based on attribute type
      let rarityPercentage;
      
      if (attr.trait_type === 'Rarity') {
        switch (attr.value.toLowerCase()) {
          case 'legendary':
            rarityPercentage = 0.05; // 5% of NFTs have this trait
            break;
          case 'rare':
            rarityPercentage = 0.15; // 15% of NFTs have this trait
            break;
          case 'uncommon':
            rarityPercentage = 0.30; // 30% of NFTs have this trait
            break;
          default: // common
            rarityPercentage = 0.50; // 50% of NFTs have this trait
        }
      } else {
        // For other attributes, generate a random rarity between 10% and 50%
        rarityPercentage = 0.1 + Math.random() * 0.4;
      }
      
      // Calculate score as 1 / frequency
      const score = 1 / rarityPercentage;
      
      return {
        trait_type: attr.trait_type,
        value: attr.value,
        rarityPercentage,
        score
      };
    });
    
    // Sum up all scores
    const totalScore = attributeScores.reduce((sum, attr) => sum + attr.score, 0);
    
    return {
      totalScore: Math.round(totalScore * 100) / 100,
      attributeScores
    };
  };
  
  const rarityData = calculateRarityScore();
  
  // Determine rarity rank based on total score
  const getRarityRank = (score) => {
    if (score > 20) return { rank: 'Mythic', color: 'text-yellow-400' };
    if (score > 15) return { rank: 'Legendary', color: 'text-orange-400' };
    if (score > 10) return { rank: 'Epic', color: 'text-purple-400' };
    if (score > 7) return { rank: 'Rare', color: 'text-blue-400' };
    if (score > 5) return { rank: 'Uncommon', color: 'text-green-400' };
    return { rank: 'Common', color: 'text-gray-400' };
  };
  
  const rarityRank = getRarityRank(rarityData.totalScore);
  
  // Calculate percentile rank (random for demonstration)
  const percentileRank = Math.floor(Math.random() * 100) + 1;
  
  return (
    <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-6">Rarity Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Score */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-dark rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-400 mb-1">Rarity Score</p>
          <p className="text-3xl font-bold">{rarityData.totalScore}</p>
        </motion.div>
        
        {/* Rarity Rank */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-dark rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-400 mb-1">Rarity Rank</p>
          <p className={`text-3xl font-bold ${rarityRank.color}`}>{rarityRank.rank}</p>
        </motion.div>
        
        {/* Percentile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-dark rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-400 mb-1">Percentile</p>
          <p className="text-3xl font-bold">Top {percentileRank}%</p>
        </motion.div>
      </div>
      
      {/* Attribute Scores */}
      <div className="space-y-4">
        <h4 className="font-medium text-lg mb-2">Attribute Rarity</h4>
        
        {rarityData.attributeScores.map((attr, index) => (
          <motion.div 
            key={`${attr.trait_type}-${attr.value}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
            className="bg-dark rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="text-gray-400 text-sm">{attr.trait_type}:</span>
                <span className="ml-2 font-medium">{attr.value}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">Score: {Math.round(attr.score * 100) / 100}</span>
              </div>
            </div>
            
            <div className="w-full bg-dark-lighter rounded-full h-1.5 mt-2">
              <div 
                className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" 
                style={{ width: `${Math.min(100, attr.score * 5)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                {Math.round(attr.rarityPercentage * 100)}% have this trait
              </span>
              <span className="text-xs text-gray-500">
                ~{Math.round(attr.rarityPercentage * collectionSize)} / {collectionSize}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RarityScore;
