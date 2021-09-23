import { BigNumber } from '@ethersproject/bignumber';
import { tryMultiCallCore } from 'hooks/useMulticall2/useMulticall2';
import {
  useERC20Contract,
  useMulticall2Contract,
} from 'hooks/useContracts/useContracts';
import { getAssetEntityId, StringAssetType } from 'utils/subgraph';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Asset } from 'hooks/marketplace/types';
import { useFetchTokenUriCallback } from 'hooks/useFetchTokenUri.ts/useFetchTokenUriCallback';
import {
  getTokenStaticCalldata,
  processTokenStaticCallResults,
} from 'utils/calls';
import { Filters } from 'ui/Filters/Filters';
import { useMoonsamaAttrIds } from 'hooks/useMoonsamaAttrIdsCallback/useMoonsamaAttrIdsCallback';

export interface StaticTokenData {
  asset: Asset;
  name?: string;
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  tokenURI?: string;
  contractURI?: string;
}

export type TokenStaticCallbackInput = {
  assetAddress?: string;
  assetType?: StringAssetType;
};

export type TokenStaticFetchInput = {
  num: number;
  offset: BigNumber;
};

export const useTokenStaticDataCallback = ({
  assetAddress,
  assetType,
}: TokenStaticCallbackInput) => {
  const { chainId } = useActiveWeb3React();
  const multi = useMulticall2Contract();

  const fetchUri = useFetchTokenUriCallback();

  const fetchTokenStaticData = useCallback(
    async (num: number, offset: BigNumber) => {
      if (!assetAddress || !assetType || !num) {
        return [];
      }

      // just because Indexes can be super huge
      const assets: Asset[] = Array.from({ length: num }, (_, i) => {
        const x = offset.add(i).toString();
        return {
          assetId: x,
          assetType,
          assetAddress,
          id: getAssetEntityId(assetAddress, x),
        };
      });

      let calls: any[] = [];
      assets.map((asset, i) => {
        calls = [...calls, ...getTokenStaticCalldata(asset)];
      });

      const results = await tryMultiCallCore(multi, calls);

      if (!results) {
        return [];
      }

      //console.log('yolo tryMultiCallCore res', results);
      const staticData = processTokenStaticCallResults(assets, results);

      const metas = await fetchUri(staticData);

      return metas.map((x, i) => {
        return {
          meta: x,
          staticData: staticData[i],
        };
      });
    },
    [chainId, assetAddress, assetType]
  );

  return fetchTokenStaticData;
};

export const useTokenStaticDataCallbackArray = () => {
  const { chainId } = useActiveWeb3React();
  const multi = useMulticall2Contract();

  const fetchUri = useFetchTokenUriCallback();

  const fetchTokenStaticData = useCallback(
    async (assets: Asset[]) => {
      if (!assets) {
        return [];
      }

      let calls: any[] = [];
      assets.map((asset, i) => {
        calls = [...calls, ...getTokenStaticCalldata(asset)];
      });

      const results = await tryMultiCallCore(multi, calls);

      if (!results) {
        return [];
      }

      //console.log('yolo tryMultiCallCore res', results);
      const staticData = processTokenStaticCallResults(assets, results);

      const metas = await fetchUri(staticData);

      return metas.map((x, i) => {
        return {
          meta: x,
          staticData: staticData[i],
        };
      });
    },
    [chainId]
  );

  return fetchTokenStaticData;
};

export const useTokenStaticDataCallbackArrayWithFilter = ({
  assetAddress,
  assetType,
}: TokenStaticCallbackInput,
  filter?: Filters
) => {
  const { chainId } = useActiveWeb3React();
  const multi = useMulticall2Contract();

  const fetchUri = useFetchTokenUriCallback();
  const ids = useMoonsamaAttrIds(filter?.traits) ?? []

  const fetchTokenStaticData = useCallback(
    async (num: number, offset: BigNumber) => {
      if ((!assetAddress || !assetType)) {
        console.log({assetAddress, assetType})
        return [];
      }

      const offsetNum = BigNumber.from(offset).toNumber()
      let chosenAssets: Asset[]

      if (ids?.length > 0) {
        //console.log('xxxx')
        if (offsetNum >= ids.length) {
          return []
        }
        const to = offsetNum + num >= ids.length ? ids.length : offsetNum + num
        const chosenIds = ids.slice(offsetNum, to)

        //console.log('xxxx', {ids, offsetNum, num, to, chosenIds})
        chosenAssets = chosenIds.map((x) => {
          return {
            assetId: x.toString(),
            assetType,
            assetAddress,
            id: getAssetEntityId(assetAddress, x),
          }
        })
      } else {
        chosenAssets = Array.from({ length: num }, (_, i) => {
          const x = offset.add(i).toString();
          return {
            assetId: x,
            assetType,
            assetAddress,
            id: getAssetEntityId(assetAddress, x),
          };
        });
        console.log('xxxx', chosenAssets)
      }

      console.log('SEARCH', {
        assetAddress, assetType, ids, num, offsetNum, chosenAssets
      })

      let calls: any[] = [];
      chosenAssets.map((asset, i) => {
        calls = [...calls, ...getTokenStaticCalldata(asset)];
      });

      const results = await tryMultiCallCore(multi, calls);

      if (!results) {
        return [];
      }

      //console.log('yolo tryMultiCallCore res', results);
      const staticData = processTokenStaticCallResults(chosenAssets, results);

      const metas = await fetchUri(staticData);

      return metas.map((x, i) => {
        return {
          meta: x,
          staticData: staticData[i],
        };
      });
    },
    [chainId, assetType, assetAddress, JSON.stringify(ids)]
  );

  return fetchTokenStaticData;
};
