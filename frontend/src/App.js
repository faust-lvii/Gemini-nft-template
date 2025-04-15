import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';

// Pages
import Home from './pages/Home';
import Mint from './pages/Mint';
import Collection from './pages/Collection';
import Roadmap from './pages/Roadmap';
import Faq from './pages/Faq';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { Web3Context } from './utils/Web3Context';

function App() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkName, setNetworkName] = useState('');

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const network = await provider.getNetwork();
        const networkName = getNetworkName(network.chainId);
        
        setAccount(accounts[0]);
        setProvider(provider);
        setSigner(signer);
        setIsConnected(true);
        setNetworkName(networkName);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
        });
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      } else {
        alert('Please install MetaMask to use this application');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Get network name from chain ID
  const getNetworkName = (chainId) => {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 5:
        return 'Goerli Testnet';
      case 11155111:
        return 'Sepolia Testnet';
      case 1337:
        return 'Local Network';
      default:
        return 'Unknown Network';
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setAccount('');
    setProvider(null);
    setSigner(null);
    setContract(null);
    setIsConnected(false);
    setNetworkName('');
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        contract,
        isConnected,
        networkName,
        connectWallet,
        disconnectWallet,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Web3Context.Provider>
  );
}

export default App;
