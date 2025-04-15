# Modern NFT Project

A modern, budget-friendly NFT project with a minimal but stylish Web3 design.

## Features

- ERC-721 standard smart contract
- Maximum 10,000 NFTs can be minted
- Adjustable mint price (default: 0.05 ETH)
- Withdrawal function for contract owner
- Comprehensive test files
- Modern React frontend with Tailwind CSS
- Responsive design for all devices
- Connect wallet functionality
- NFT minting page
- Collection display
- Roadmap and FAQ sections

## Requirements

- Node.js (v16 or higher)
- npm or yarn
- MetaMask wallet

## Project Structure

```
modern-nft-project/
├── contracts/          # Smart contracts
├── scripts/            # Deployment scripts
├── test/               # Test files
├── frontend/           # React frontend
│   ├── public/         # Static files
│   └── src/            # React source code
└── hardhat.config.js   # Hardhat configuration
```

## Installation

1. Install project dependencies:

```bash
npm install
```

2. Compile smart contracts:

```bash
npx hardhat compile
```

3. Run tests:

```bash
npx hardhat test
```

4. Start the frontend development server:

```bash
cd frontend
npm install
npm start
```

## Deployment

1. Start a local development network:

```bash
npx hardhat node
```

2. Deploy the contract to the local network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. To deploy to a real network (e.g., Goerli test network), edit the hardhat.config.js file and add your private key and RPC URL.

## NFT Metadata

NFT metadata should be stored in a decentralized storage solution like IPFS. Each NFT's metadata file should follow this format:

```json
{
  "name": "NFT Name #1",
  "description": "Description about this NFT",
  "image": "ipfs://YOUR_CID_HERE/1.png",
  "attributes": [
    {
      "trait_type": "Attribute 1",
      "value": "Value 1"
    },
    {
      "trait_type": "Attribute 2",
      "value": "Value 2"
    }
  ]
}
```

## License

This project is licensed under the MIT License.
