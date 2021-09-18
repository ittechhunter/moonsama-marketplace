/// <reference types="react-scripts" />

declare module 'jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement;
}

declare module 'toformat';

interface Window {
  ethereum?: {
    isMetaMask?: true;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    autoRefreshOnNetworkChange?: boolean;
  };
  web3?: {};
}
