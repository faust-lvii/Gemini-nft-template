import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';

const Home = () => {
  const { connectWallet, isConnected } = useContext(Web3Context);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
                    <button onClick={connectWallet} className="btn-outline">
                      Connect Wallet
                    </button>
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

      {/* Features Section */}
      <section className="bg-dark py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              <span className="text-gradient">Features</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our NFT collection comes with a range of features designed to provide value and utility to our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Unique Artwork</h3>
              <p className="text-gray-400">
                Each NFT is algorithmically generated with unique traits and characteristics, making every piece one-of-a-kind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Ownership</h3>
              <p className="text-gray-400">
                Your NFTs are securely stored on the Ethereum blockchain, ensuring verifiable ownership and provenance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Access</h3>
              <p className="text-gray-400">
                Owning our NFTs grants you access to exclusive community events, future airdrops, and governance rights.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-20 bg-dark-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">Collection Preview</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get a sneak peek at some of the unique NFTs in our collection.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="card overflow-hidden"
              >
                <div 
                  className="aspect-square" 
                  style={{ 
                    background: `linear-gradient(${45 + index * 20}deg, 
                    hsl(${(index * 36) % 360}, 70%, 60%), 
                    hsl(${((index * 36) + 60) % 360}, 70%, 60%))` 
                  }}
                ></div>
                <div className="p-3">
                  <p className="font-medium text-sm">ModernNFT #{index + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/collection" className="btn-outline">
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-dark-light relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-dark-light border border-gray-800 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <h2 className="mb-6 text-gradient">Ready to Join the Collection?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't miss your chance to own a piece of this unique NFT collection. Mint your NFT today and become part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/mint" className="btn-primary">
                Mint Your NFT
              </Link>
              <Link to="/roadmap" className="btn-outline">
                View Roadmap
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
