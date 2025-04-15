import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Web3Context } from '../utils/Web3Context';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isConnected, account, connectWallet, disconnectWallet } = useContext(Web3Context);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
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
            <Link to="/roadmap" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/roadmap' ? 'text-primary' : 'text-gray-300'}`}>
              Roadmap
            </Link>
            <Link to="/faq" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/faq' ? 'text-primary' : 'text-gray-300'}`}>
              FAQ
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-dark-lighter rounded-lg text-sm text-gray-300">
                  {truncateAddress(account)}
                </div>
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
              className="text-gray-300 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
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
              <Link to="/roadmap" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/roadmap' ? 'text-primary' : 'text-gray-300'}`}>
                Roadmap
              </Link>
              <Link to="/faq" className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/faq' ? 'text-primary' : 'text-gray-300'}`}>
                FAQ
              </Link>
              
              {/* Mobile Connect Wallet Button */}
              <div className="pt-2">
                {isConnected ? (
                  <div className="flex flex-col space-y-2">
                    <div className="px-4 py-2 bg-dark-lighter rounded-lg text-sm text-gray-300 w-full text-center">
                      {truncateAddress(account)}
                    </div>
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
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
