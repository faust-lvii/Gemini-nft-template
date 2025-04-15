import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import ConnectWallet from './ConnectWallet';

const Hero = () => {
  const { isConnected } = useContext(Web3Context);

  return (
    <section className="relative overflow-hidden grid-pattern-bg">
      <div className="container-custom py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6">
                <span className="text-gradient">Modern NFT</span> Collection
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                A unique collection of 10,000 digital collectibles living on the Ethereum blockchain. Each NFT is uniquely generated with its own characteristics and traits.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/mint" className="btn-primary text-center">
                  Mint Now
                </Link>
                {!isConnected && (
                  <ConnectWallet />
                )}
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* NFT Grid Display */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card p-2 glow"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary aspect-square rounded-lg"></div>
                  <div className="p-2">
                    <p className="text-sm font-medium">ModernNFT #1</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card p-2"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 aspect-square rounded-lg"></div>
                  <div className="p-2">
                    <p className="text-sm font-medium">ModernNFT #2</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card p-2"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-teal-400 aspect-square rounded-lg"></div>
                  <div className="p-2">
                    <p className="text-sm font-medium">ModernNFT #3</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card p-2 glow"
                >
                  <div className="bg-gradient-to-br from-amber-500 to-red-500 aspect-square rounded-lg"></div>
                  <div className="p-2">
                    <p className="text-sm font-medium">ModernNFT #4</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse-slow"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;
