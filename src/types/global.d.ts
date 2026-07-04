// Global type declarations for the KeeperHub LaunchPad AI project

export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<string[]>;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
