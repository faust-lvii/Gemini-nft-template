import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Context } from './Web3Context';
import { getContract, getNetworkName, isMetaMaskInstalled } from './contractUtils';

// Contract address - will be updated after deployment
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkName, setNetworkName] = useState('');
  const [chainId, setChainId] = useState(null);

  // Initialize provider
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      // Create a provider from window.ethereum
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);

      // Get the network and set the network name
      ethersProvider.getNetwork().then(network => {
        setChainId(network.chainId);
        setNetworkName(getNetworkName(network.chainId));
      });

      // Check if already connected
      ethersProvider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          handleAccountsChanged(accounts);
        }
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', (_chainId) => {
        window.location.reload();
      });

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAccount('');
      setSigner(null);
      setContract(null);
      setIsConnected(false);
    } else {
      // User connected their wallet
      setAccount(accounts[0]);
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signerInstance = ethersProvider.getSigner();
      setSigner(signerInstance);
      
      // Initialize contract with signer
      const contractInstance = getContract(CONTRACT_ADDRESS, signerInstance);
      setContract(contractInstance);
      setIsConnected(true);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert('Please install MetaMask to use this feature');
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      handleAccountsChanged(accounts);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount('');
    setSigner(null);
    setContract(null);
    setIsConnected(false);
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
        chainId,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
