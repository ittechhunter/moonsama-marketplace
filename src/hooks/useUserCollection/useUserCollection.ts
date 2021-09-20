import { NFT_SUBGRAPH_URL } from '../../constants';
import { BigNumber } from '@ethersproject/bignumber';
import { request } from 'graphql-request';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Asset } from 'hooks/marketplace/types';
import { useTokenStaticDataCallbackArray } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { QUERY_USER_ERC721 } from 'subgraph/erc721Queries';
import { getAssetEntityId, StringAssetType } from 'utils/subgraph';

export interface OwnedTokens {
  id: string;
  ownedTokens: { id: string; contract: { id: string } }[];
}

export const useUserCollection = () => {
  const { chainId } = useActiveWeb3React();
  const staticCallback = useTokenStaticDataCallbackArray();

  const fetchUserCollection = useCallback(
    async (account: string) => {
      const query = QUERY_USER_ERC721(account);
      const response = await request(NFT_SUBGRAPH_URL, query);

      console.debug('YOLO fetchUserCollection', response);

      if (!response) {
        return [];
      }

      const ot: OwnedTokens = response.owners?.[0];

      if (!ot) {
        return [];
      }

      const assets: Asset[] = ot.ownedTokens.map((x) => {
        const aid = BigNumber.from(x.id).toString();
        return {
          assetId: aid,
          id: getAssetEntityId(x.contract.id, aid),
          assetType: StringAssetType.ERC721,
          assetAddress: x.contract.id,
        };
      });

      const staticDatas = await staticCallback(assets);

      const datas = staticDatas.map((sd, i) => {
        return {
          meta: sd.meta,
          staticData: sd.staticData,
          asset: assets[i],
        };
      });
      return datas;
    },
    [chainId]
  );

  return fetchUserCollection;
};
