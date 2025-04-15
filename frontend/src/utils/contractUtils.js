import { ethers } from 'ethers';

// This will be replaced with the actual ABI after contract compilation
const ModernNFTABI = [
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
  "event MintPriceChanged(uint256 newPrice)",
  "event SaleStateChanged(uint8 newState)",
  "event BaseURIChanged(string newBaseURI)",
  "event MetadataUpdate(uint256 _tokenId)",
  "event BatchMetadataUpdate(uint256 _fromTokenId, uint256 _toTokenId)",
  
  // View functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function totalSupply() view returns (uint256)",
  "function mintPrice() view returns (uint256)",
  "function MAX_SUPPLY() view returns (uint256)",
  "function saleState() view returns (uint8)",
  "function whitelisted(address) view returns (bool)",
  "function owner() view returns (address)",
  
  // Transaction functions
  "function mint(uint256 quantity) payable",
  "function setMintPrice(uint256 _mintPrice)",
  "function setSaleState(uint8 _saleState)",
  "function setBaseURI(string memory baseURI)",
  "function addToWhitelist(address[] calldata addresses)",
  "function removeFromWhitelist(address[] calldata addresses)",
  "function withdraw()",
  "function updateTokenMetadata(uint256 tokenId)"
];

// Initialize contract with signer
export const getContract = (contractAddress, signer) => {
  return new ethers.Contract(contractAddress, ModernNFTABI, signer);
};

// Get total supply
export const getTotalSupply = async (contract) => {
  try {
    return await contract.totalSupply();
  } catch (error) {
    console.error('Error getting total supply:', error);
    return 0;
  }
};

// Get mint price
export const getMintPrice = async (contract) => {
  try {
    const price = await contract.mintPrice();
    return ethers.utils.formatEther(price);
  } catch (error) {
    console.error('Error getting mint price:', error);
    return '0.05';
  }
};

// Get sale state
export const getSaleState = async (contract) => {
  try {
    const state = await contract.saleState();
    return parseInt(state);
  } catch (error) {
    console.error('Error getting sale state:', error);
    return 0; // Default to paused
  }
};

// Check if address is whitelisted
export const isWhitelisted = async (contract, address) => {
  try {
    return await contract.whitelisted(address);
  } catch (error) {
    console.error('Error checking whitelist status:', error);
    return false;
  }
};

// Mint NFTs
export const mintNFTs = async (contract, quantity, price) => {
  try {
    const tx = await contract.mint(quantity, {
      value: ethers.utils.parseEther(price.toString())
    });
    return await tx.wait();
  } catch (error) {
    console.error('Error minting NFTs:', error);
    throw error;
  }
};

// Get NFTs owned by address
export const getNFTsOwnedBy = async (contract, address) => {
  try {
    const balance = await contract.balanceOf(address);
    const nfts = [];
    
    for (let i = 0; i < balance; i++) {
      // This is a simplified approach and might not be efficient for large collections
      // In a production environment, you might want to use a more efficient method
      // like events or a subgraph
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const tokenURI = await contract.tokenURI(tokenId);
      
      nfts.push({
        tokenId: tokenId.toString(),
        tokenURI
      });
    }
    
    return nfts;
  } catch (error) {
    console.error('Error getting NFTs owned by address:', error);
    return [];
  }
};

// Format wallet address for display
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Get network name from chain ID
export const getNetworkName = (chainId) => {
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

// Check if MetaMask is installed
export const isMetaMaskInstalled = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

// Add network to MetaMask
export const addNetwork = async (chainId) => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }
  
  try {
    switch (chainId) {
      case 1: // Ethereum Mainnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
        break;
      case 5: // Goerli Testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        });
        break;
      case 11155111: // Sepolia Testnet
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xaa36a7',
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia Ether',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
          ],
        });
        break;
      default:
        throw new Error('Unsupported network');
    }
  } catch (error) {
    console.error('Error adding network:', error);
    throw error;
  }
};
