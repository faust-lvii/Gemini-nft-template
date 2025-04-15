import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Web3Context } from '../utils/Web3Context';
import { motion } from 'framer-motion';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { isConnected, account, connectWallet, disconnectWallet } = useContext(Web3Context);
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowFeatures(false);
  }, [location]);

  // Truncate wallet address for display
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-dark-light backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gradient"
            >
              ModernNFT
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-gray-300'}`}>
              Home
            </Link>
            <Link to="/mint" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/mint' ? 'text-primary' : 'text-gray-300'}`}>
              Mint
            </Link>
            <Link to="/collection" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/collection' ? 'text-primary' : 'text-gray-300'}`}>
              Collection
            </Link>
            <div className="relative">
              <button 
                onClick={() => setShowFeatures(!showFeatures)}
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center ${
                  ['/mint-wizard', '/collection-comparison', '/market-analytics', '/creator-dashboard'].includes(location.pathname) 
                    ? 'text-primary' 
                    : 'text-gray-300'
                }`}
              >
                Features
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${showFeatures ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFeatures && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-dark-light border border-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <Link 
                    to="/mint-wizard" 
                    className="block px-4 py-2 text-sm hover:bg-dark hover:text-primary transition-colors"
                    onClick={() => setShowFeatures(false)}
                  >
                    NFT Minting Wizard
                  </Link>
                  <Link 
                    to="/collection-comparison" 
                    className="block px-4 py-2 text-sm hover:bg-dark hover:text-primary transition-colors"
                    onClick={() => setShowFeatures(false)}
                  >
                    Collection Comparison
                  </Link>
                  <Link 
                    to="/market-analytics" 
                    className="block px-4 py-2 text-sm hover:bg-dark hover:text-primary transition-colors"
                    onClick={() => setShowFeatures(false)}
                  >
                    Market Analytics
                  </Link>
                  <Link 
                    to="/creator-dashboard" 
                    className="block px-4 py-2 text-sm hover:bg-dark hover:text-primary transition-colors"
                    onClick={() => setShowFeatures(false)}
                  >
                    Creator Dashboard
                  </Link>
                </div>
              )}
            </div>
            <Link to="/roadmap" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/roadmap' ? 'text-primary' : 'text-gray-300'}`}>
              Roadmap
            </Link>
            <Link to="/faq" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/faq' ? 'text-primary' : 'text-gray-300'}`}>
              FAQ
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Bell */}
            <NotificationBell />
            
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-dark-lighter rounded-lg text-sm text-gray-300">
                  {truncateAddress(account)}
                </div>
                <Link 
                  to="/profile" 
                  className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/profile' ? 'text-primary' : 'text-gray-300'}`}
                >
                  Profile
                </Link>
                <button
                  onClick={disconnectWallet}
                  className="btn-outline text-sm py-2"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="btn-primary text-sm py-2"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary transition-colors"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-dark-light border-t border-gray-800"
        >
          <div className="container-custom py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-gray-300'}`}>
                Home
              </Link>
              <Link to="/mint" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/mint' ? 'text-primary' : 'text-gray-300'}`}>
                Mint
              </Link>
              <Link to="/collection" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/collection' ? 'text-primary' : 'text-gray-300'}`}>
                Collection
              </Link>
              <div>
                <button 
                  onClick={() => setShowFeatures(!showFeatures)}
                  className={`text-sm font-medium hover:text-primary transition-colors flex items-center justify-between w-full ${
                    ['/mint-wizard', '/collection-comparison', '/market-analytics', '/creator-dashboard'].includes(location.pathname) 
                      ? 'text-primary' 
                      : 'text-gray-300'
                  }`}
                >
                  <span>Features</span>
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform ${showFeatures ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showFeatures && (
                  <div className="pl-4 mt-2 space-y-2 border-l border-gray-800">
                    <Link 
                      to="/mint-wizard" 
                      className="block py-1 text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      NFT Minting Wizard
                    </Link>
                    <Link 
                      to="/collection-comparison" 
                      className="block py-1 text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      Collection Comparison
                    </Link>
                    <Link 
                      to="/market-analytics" 
                      className="block py-1 text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      Market Analytics
                    </Link>
                    <Link 
                      to="/creator-dashboard" 
                      className="block py-1 text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      Creator Dashboard
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/roadmap" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/roadmap' ? 'text-primary' : 'text-gray-300'}`}>
                Roadmap
              </Link>
              <Link to="/faq" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/faq' ? 'text-primary' : 'text-gray-300'}`}>
                FAQ
              </Link>
              
              {/* Mobile Connect Wallet Button */}
              <div className="pt-2">
                {/* Mobile Notification Bell */}
                <div className="flex justify-center mb-4">
                  <NotificationBell />
                </div>
                
                {isConnected ? (
                  <div className="flex flex-col space-y-2">
                    <div className="px-4 py-2 bg-dark-lighter rounded-lg text-sm text-gray-300 w-full text-center">
                      {truncateAddress(account)}
                    </div>
                    <Link 
                      to="/profile" 
                      className="btn-primary text-sm py-2 w-full text-center"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={disconnectWallet}
                      className="btn-outline text-sm py-2 w-full"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="btn-primary text-sm py-2 w-full"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
