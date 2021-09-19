export const collections = {
  name: 'MoonSama List',
  timestamp: '2021-08-18T00:00:00.000Z',
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  keywords: [
    'susu',
    'carbonswap',
    'marketplace',
    'finance',
    'dex',
    'green',
    'sustainable',
  ],
  logoURI:
    'https://',
  tags: {
    wrapped: {
      name: 'wrapped',
      description:
        'Assets that are a wrapped version of their original, holding the same value',
    },
    bridged: {
      name: 'bridged',
      description: 'Assets that are bridged over from another chain',
    },
    meme: {
      name: 'meme',
      description: 'Assets that were created with no specific purpose, for fun',
    },
    native: {
      name: 'native',
      description: 'Assets that are native to Moonriver',
    },
  },
  types: ['ERC20', 'ERC721', 'ERC1155'],
  indexing: ['none', 'sequential'],
  collections: [
    {
      chainId: 73799,
      address: '0xC9016D2E189f3D9aBa48D627A7c8653B0663C291',
      display_name: 'Moonsama',
      symbol: 'MSAMA',
      type: 'ERC721',
      indexing: 'sequential',
      contractURI: 'ipfs://QmQzz765Q6j2LjWJHPmComm1i7Kpeccz27x6tpTeHFFCxg',
      tags: ['native', 'green'],
    }
  ],
};

export default collections;
