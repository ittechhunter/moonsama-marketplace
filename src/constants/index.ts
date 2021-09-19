export const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ?? '246', 10);

export const SUBGRAPH_URL =
  process.env.REACT_APP_SUBGRAPH_URL ??
  'http://localhost:8000/subgraphs/name/carbonswap/marketplace';

export const NetworkContextName = 'NETWORK';

export const DEFAULT_ORDERBOOK_PAGINATION: number = 100;

export const POLLING_INTERVAL = 15000;
export const SUBGRAPH_MAX_BLOCK_DELAY = 2;

export const PINATA_GATEWAY =
  process.env.REACT_APP_PINATA_IPFS_URL ??
  'https://carbonswap.mypinata.cloud/ipfs/';

console.log('YOLO SUBGRAPH_URL', { SUBGRAPH_URL, CHAIN_ID });

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC = 56,
  EWC = 246,
  VOLTA = 73799,
}

export const MULTICALL_NETWORKS: { [chainId: number]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  [ChainId.VOLTA]: '0xf097d0eAb2dC8B6396a6433978567C443a691815', // latest multicall 2 deployments
  [ChainId.EWC]: '0x1fD82C3060d9941273fae7ac6712676d2F9eFA0a', // latest multicall 2 deployments
};

export enum SUPPORTED_CONTRACTS {
  'ENS_RESOLVER' = 'ENS_RESOLVER',
}

export const MARKETPLACE_V1_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.VOLTA]: '0xE1681925E9d1fa2c735184835b348a98c34017C7',
  [ChainId.EWC]: '0xdEfdc3C84cfdd7aC3fE5630A58c280Aa045a9D49',
};

export const WAREHOUSE_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.VOLTA]: '0xE796e4CC54856b5d88E44aAca85e3B7D633c34a1',
  [ChainId.EWC]: '0x122FADdb4e0396805A4e44D399fB36846aF26fF8',
};

export const RECOGNIZED_COLLECTIONS_ADDRESS: { [chainId in ChainId]?: string } =
  {
    [ChainId.VOLTA]: '0xe35D9ACD226165d21d8bC7cf2C6D71b0deCb67d6',
    [ChainId.EWC]: '0x70CC4FE9E48a836f6188c6286dDeaDD5B67aC8C2',
  };

export const WMOVR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.VOLTA]: '0xcBe8903EFA22711608D2f0B9aA09852f9B30DBdc', //0xFF3e85e33A8Cfc73fe08F437bFAEADFf7C95e285
  [ChainId.EWC]: '0x9cd9CAECDC816C3E7123A4F130A91A684D01f4Dc',
};

// wrapped native tokens
export const WNATIVE_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.VOLTA]: '0xDb8B4264b1777e046267b4Cc123f0C9E029cEB2c',
  [ChainId.EWC]: '0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd',
};

export const EXPLORER_URL: { [chainId in ChainId]?: string } = {
  [ChainId.VOLTA]: 'https://volta-explorer.energyweb.org',
  [ChainId.EWC]: 'https://explorer.energyweb.org',
};

export const PROTOCOL_FEE_BPS = '100';
export const FRACTION_TO_BPS = '10000';

export const STRATEGY_SIMPLE =
  '0xb4c34ccd96d70009be083eaea45c708dff031622381acfcf6e3d07039aca39bb';

export const IPFS_GATEWAYS = [
  'https://carbonswap.mypinata.cloud',
  'https://cloudflare-ipfs.com',
  'https://ipfs.io',
];

export const MAX_WIDTH_TO_SHOW_NAVIGATION = 1000
