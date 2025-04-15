# Modern NFT Frontend

This is the frontend for the Modern NFT project, built with React and Tailwind CSS.

## Features

- Modern, responsive UI with Web3 aesthetic
- Connect wallet functionality
- NFT minting interface
- Collection display
- Roadmap and FAQ sections
- Mobile-friendly design

## Technologies Used

- React.js
- Tailwind CSS
- Ethers.js for blockchain interaction
- Framer Motion for animations
- React Router for navigation
- Web3Modal for wallet connection

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or another Ethereum wallet

### Installation

1. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

2. Start the development server:

```bash
npm start
```

or

```bash
yarn start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
frontend/
├── public/               # Static files
├── src/                  # Source code
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   ├── App.js            # Main App component
│   └── index.js          # Entry point
├── package.json          # Dependencies and scripts
└── tailwind.config.js    # Tailwind CSS configuration
```

## Building for Production

To build the app for production, run:

```bash
npm run build
```

or

```bash
yarn build
```

This will create an optimized production build in the `build` folder.

## Connecting to Smart Contract

The frontend is designed to connect to the ModernNFT smart contract. After deploying the contract, update the contract address in `src/utils/contractUtils.js` to interact with your deployed contract.

## Customization

- Colors and theme: Edit `tailwind.config.js`
- Content: Update text in the respective page components
- Images: Replace placeholder images in the assets folder
