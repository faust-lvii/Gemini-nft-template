import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import TransactionHistory from '../components/TransactionHistory';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatAddress } from '../utils/contractUtils';
import AttributeCard from '../components/AttributeCard';
import PriceChart from '../components/PriceChart';
import OwnershipHistory from '../components/OwnershipHistory';

const NFTDetail = () => {
  const { id } = useParams();
  const { contract, isConnected, account } = useContext(Web3Context);
  const [nft, setNft] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTData = async () => {
      setIsLoading(true);
      try {
        // For demo purposes, we'll create sample data
        // In a real application, you would fetch this from the contract and IPFS
        const sampleNFT = {
          id: parseInt(id),
          name: `ModernNFT #${id}`,
          description: "This unique digital collectible is part of the Modern NFT collection, representing the fusion of art and technology in the digital age.",
          image: `https://via.placeholder.com/800x800.png?text=NFT+${id}`,
          attributes: [
            { trait_type: 'Type', value: ['Cosmic', 'Digital', 'Neon', 'Cyber'][Math.floor(Math.random() * 4)] },
            { trait_type: 'Color', value: ['Red', 'Blue', 'Green', 'Purple'][Math.floor(Math.random() * 4)] },
            { trait_type: 'Background', value: ['Space', 'Grid', 'Void', 'Circuit'][Math.floor(Math.random() * 4)] },
            { trait_type: 'Rarity', value: Math.random() < 0.2 ? 'Legendary' : Math.random() < 0.4 ? 'Rare' : 'Common' }
          ],
          created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        };

        setNft(sampleNFT);

        // If connected to a contract, we would fetch the owner
        // For demo purposes, we'll use a sample address
        setOwner(isConnected ? (Math.random() > 0.5 ? account : '0x1234567890abcdef1234567890abcdef12345678') : '0x1234567890abcdef1234567890abcdef12345678');
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching NFT data:', err);
        setError('Failed to load NFT data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchNFTData();
  }, [id, contract, isConnected, account]);

  // Get background gradient based on rarity
  const getBackgroundGradient = (rarity) => {
    if (!rarity) return 'from-blue-500 to-purple-500';
    
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'rare':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  // Get rarity badge
  const getRarityBadge = (rarity) => {
    if (!rarity) return null;
    
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return (
          <div className="absolute top-4 right-4 bg-yellow-500 text-xs font-bold text-black px-3 py-1 rounded-md">
            LEGENDARY
          </div>
        );
      case 'rare':
        return (
          <div className="absolute top-4 right-4 bg-purple-500 text-xs font-bold text-white px-3 py-1 rounded-md">
            RARE
          </div>
        );
      default:
        return (
          <div className="absolute top-4 right-4 bg-blue-500 text-xs font-bold text-white px-3 py-1 rounded-md">
            COMMON
          </div>
        );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-gray-400 mb-8">{error}</p>
            <Link to="/collection" className="btn-primary">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">NFT Not Found</h2>
            <p className="text-gray-400 mb-8">The NFT you're looking for doesn't exist or has been removed.</p>
            <Link to="/collection" className="btn-primary">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const rarityAttribute = nft.attributes.find(attr => attr.trait_type === 'Rarity');
  const rarity = rarityAttribute ? rarityAttribute.value : 'Common';
  const bgGradient = getBackgroundGradient(rarity);

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/collection" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NFT Image */}
            <div className={`aspect-square bg-gradient-to-br ${bgGradient} rounded-xl overflow-hidden relative`}>
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
              {getRarityBadge(rarity)}
            </div>

            {/* NFT Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{nft.name}</h1>
                <p className="text-gray-400">{nft.description}</p>
              </div>

              {/* Owner Info */}
              <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-4">Owner</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <a 
                      href={`https://etherscan.io/address/${owner}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {formatAddress(owner)}
                    </a>
                    <p className="text-sm text-gray-400">Owner</p>
                  </div>
                </div>
              </div>

              {/* Attributes */}
              <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-4">Attributes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {nft.attributes.map((attr, index) => (
                    <AttributeCard 
                      key={index}
                      trait_type={attr.trait_type}
                      value={attr.value}
                      rarity={attr.trait_type === 'Rarity' ? attr.value : 'common'}
                      count={Math.floor(Math.random() * 100) + 1}
                      total={1000}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token ID</span>
                    <span>{nft.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract Address</span>
                    <a 
                      href={`https://etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {formatAddress(process.env.REACT_APP_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000')}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Standard</span>
                    <span>ERC-721</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Blockchain</span>
                    <span>Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created</span>
                    <span>{formatDate(nft.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isConnected && owner === account && (
                <div className="flex gap-4">
                  <button className="btn-primary flex-1">
                    Transfer
                  </button>
                  <button className="btn-outline flex-1">
                    List for Sale
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-12 space-y-8">
            {/* Price Chart */}
            <PriceChart tokenId={id} />
            
            {/* Ownership History */}
            <OwnershipHistory />
            
            {/* Transaction History */}
            <TransactionHistory />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NFTDetail;
