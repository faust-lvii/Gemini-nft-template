import { createContext } from 'react';

export const Web3Context = createContext({
  account: '',
  provider: null,
  signer: null,
  contract: null,
  isConnected: false,
  networkName: '',
  connectWallet: () => {},
  disconnectWallet: () => {},
});
