import {useMemo} from 'react'
import { useActiveWeb3React } from '../../hooks';
import axios, { AxiosError } from 'axios';
import { StringAssetType } from 'utils/subgraph';


export type OpenData = {
    lootboxId: string
}

export type Reward = {
    assetAddress: string
    assetId: string
    amount: string
    assetType: StringAssetType;
    tokenURI: string;
}

export enum LootboxOpenStatus {
    MINT_IN_PROGRESS = 'MINT_IN_PROGRESS',
    BUSY = 'BUSY',
}

export type RewardData = {
    rewards: Reward[],
    status: LootboxOpenStatus
}

export function useLootboxOpen(
  data: OpenData,
): {
  callback: undefined | (() => Promise<[RewardData | undefined, Error | undefined]>);
} {
  const { account, chainId } = useActiveWeb3React();

  const {lootboxId} = data

  return useMemo(() => {
    if (!account || !chainId || !lootboxId) {
      return {
        callback: undefined
      };
    }

    if (!lootboxId) {
      return {
        callback: undefined
      };
    }

    return {
      callback: async function onOpen(): Promise<[RewardData | undefined, Error | undefined]> {
        try {
            const resp = await axios.request<RewardData>({
                method: 'put',
                url: `${process.env.REACT_APP_BACKEND_API_URL}/lootbox/open`,
                data: {
                    lootboxId,
                    amount: '1',
                    recipient: account
                }
            });
            console.log(resp.data)
            return [resp.data as RewardData, undefined]
        } catch(e) {
            const err = e as AxiosError;
            console.error('Error summoning. Try again later.')
            return [undefined, err]
        }
      }
    };
  }, [
    lootboxId,
    account,
    chainId,
  ]);
}
