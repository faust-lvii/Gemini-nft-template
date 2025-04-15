import React, { useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import ConnectWallet from '../components/ConnectWallet';
import MintCounter from '../components/MintCounter';
import LoadingSpinner from '../components/LoadingSpinner';

// Import ABI when available
// import ModernNFTABI from '../utils/ModernNFTABI.json';

const Mint = () => {
  const { isConnected, connectWallet, account, signer, contract } = useContext(Web3Context);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState('0.05');
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState('');
  const [txHash, setTxHash] = useState('');

  // Contract details
  const contractAddress = '0x0000000000000000000000000000000000000000'; // Replace with actual address after deployment
  const mintPrice = 0.05; // ETH

  // Update total price when quantity changes
  useEffect(() => {
    setTotalPrice((quantity * mintPrice).toFixed(2));
  }, [quantity]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Mint NFT function
  const mintNFT = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    try {
      setIsMinting(true);
      setMintError('');
      setMintSuccess(false);

      // For demo purposes, we'll simulate a transaction
      // In a real implementation, you would interact with the contract
      
      // Example contract interaction (commented out until ABI is available)
      /*
      const contract = new ethers.Contract(contractAddress, ModernNFTABI, signer);
      const transaction = await contract.mint(quantity, {
        value: ethers.utils.parseEther(totalPrice.toString())
      });
      
      const receipt = await transaction.wait();
      setTxHash(receipt.transactionHash);
      */
      
      // Simulate transaction for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTxHash('0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
      
      setMintSuccess(true);
      setIsMinting(false);
    } catch (error) {
      console.error('Error minting NFT:', error);
      setMintError(error.message || 'An error occurred while minting');
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 grid-pattern-bg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="mb-4">
              <span className="text-gradient">Mint</span> Your NFT
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our exclusive NFT collection by minting your unique digital collectible. Each NFT is algorithmically generated with unique traits and characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mint Preview */}
            <div className="space-y-6">
              <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
                <div className="aspect-square rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <div className="text-4xl font-bold text-white">?</div>
                </div>
                <h3 className="text-xl font-bold mb-2">ModernNFT Collection</h3>
                <p className="text-gray-400 mb-4">
                  Each NFT is unique and randomly generated from over 100 possible traits.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="font-medium">{mintPrice} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Supply:</span>
                    <span className="font-medium">10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Per Transaction:</span>
                    <span className="font-medium">10</span>
                  </div>
                </div>
              </div>

              {/* Mint Counter */}
              <MintCounter contract={contract} maxSupply={10000} />
            </div>

            {/* Mint Form */}
            <div className="space-y-6">
              <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-4">Mint Details</h3>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      className="bg-dark-lighter hover:bg-dark-light border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max="10"
                      className="w-full bg-dark-lighter border-y border-gray-700 text-center py-2 focus:outline-none"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="bg-dark-lighter hover:bg-dark-light border border-gray-700 rounded-r-lg px-4 py-2 focus:outline-none"
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="mb-6 p-4 bg-dark rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Price per NFT:</span>
                    <span>{mintPrice} ETH</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Quantity:</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="font-medium">Total Price:</span>
                    <span className="font-medium">{totalPrice} ETH</span>
                  </div>
                </div>

                {/* Mint Button */}
                {isConnected ? (
                  <button
                    onClick={mintNFT}
                    disabled={isMinting}
                    className={`btn-primary w-full ${isMinting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isMinting ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="small" color="white" className="mr-2" />
                        <span>Minting...</span>
                      </div>
                    ) : (
                      'Mint Now'
                    )}
                  </button>
                ) : (
                  <ConnectWallet className="w-full" />
                )}

                {/* Success Message */}
                {mintSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg"
                  >
                    <p className="text-green-400 font-medium mb-2">
                      Successfully minted {quantity} NFT{quantity > 1 ? 's' : ''}!
                    </p>
                    <p className="text-gray-400 text-sm">
                      Transaction Hash:{' '}
                      <a
                        href={`https://etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {txHash}
                      </a>
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {mintError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg"
                  >
                    <p className="text-red-400">
                      Error: {mintError}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-dark-light rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">How to Mint</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-bold mb-2">Connect Wallet</h4>
                <p className="text-gray-400 text-sm">
                  Connect your MetaMask or other Ethereum wallet to get started.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-bold mb-2">Select Quantity</h4>
                <p className="text-gray-400 text-sm">
                  Choose how many NFTs you want to mint (up to 10 per transaction).
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-bold mb-2">Confirm Transaction</h4>
                <p className="text-gray-400 text-sm">
                  Approve the transaction in your wallet and wait for confirmation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mint;
