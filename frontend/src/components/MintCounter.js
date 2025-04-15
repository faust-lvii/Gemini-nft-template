import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const MintCounter = ({ contract, maxSupply = 10000 }) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTotalSupply = async () => {
      if (!contract) {
        // If no contract is provided, simulate with random data for demo purposes
        setTimeout(() => {
          const randomSupply = Math.floor(Math.random() * 3000);
          setTotalSupply(randomSupply);
          setIsLoading(false);
        }, 1000);
        return;
      }

      try {
        const supply = await contract.totalSupply();
        setTotalSupply(parseInt(supply.toString()));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching total supply:', error);
        setError('Failed to fetch total supply');
        setIsLoading(false);
      }
    };

    fetchTotalSupply();
  }, [contract]);

  // Calculate percentage minted
  const percentageMinted = (totalSupply / maxSupply) * 100;

  return (
    <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Mint Progress</h3>
      
      {isLoading ? (
        <div className="py-6">
          <LoadingSpinner size="small" className="mx-auto" />
        </div>
      ) : error ? (
        <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Total Minted:</span>
            <span className="font-medium">{totalSupply} / {maxSupply}</span>
          </div>
          
          <div className="w-full h-3 bg-dark-lighter rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentageMinted}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{percentageMinted.toFixed(1)}% Minted</span>
            <span className="text-gray-500">{maxSupply - totalSupply} Remaining</span>
          </div>
          
          {percentageMinted >= 90 && (
            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-yellow-400 text-sm">Almost sold out! Mint yours before they're gone.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MintCounter;
