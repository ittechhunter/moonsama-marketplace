import { BigNumber } from '@ethersproject/bignumber';
import { request } from 'graphql-request';
import { SUBGRAPH_MAX_BLOCK_DELAY, SUBGRAPH_URL } from '../../constants';
import {
  QUERY_ESCROW_BALANCES_OF_USER,
  QUERY_NONZERO_ESCROW_BALANCES_OF_USER,
} from '../../subgraph/escrowQueries';
import { Balance } from './types';
import { useBlockNumber } from '../../state/application/hooks';
import { useActiveWeb3React } from 'hooks';
import { useState, useCallback, useEffect } from 'react';
import { stringToStringAssetType } from 'utils/subgraph';

export const useEscrowBalances = (nonzero: boolean = false) => {
  const { account } = useActiveWeb3React();
  const blockNumber = useBlockNumber();

  console.debug('YOLO getEscrowBalances', { nonzero, blockNumber });

  const [balances, setBalances] = useState<Balance[] | undefined>();

  const fetchEscrowBalances = useCallback(async () => {
    if (!account) {
      return;
    }

    /*
        const result = blockNumber
        ? await request(
            SUBGRAPH_URL,
            nonzero ? queryNonZeroEscrowBalancesOfUserAtBlock : queryEscrowBalancesOfUserAtBlock,
            { user: userAddress, block: { number: blockNumber } }
            )
        : await request(
            SUBGRAPH_URL,
            nonzero ? queryNonZeroEscrowBalancesOfUser : queryEscrowBalancesOfUser,
            { user: userAddress }
            );
        */
    const result = await request(
      SUBGRAPH_URL,
      nonzero
        ? QUERY_NONZERO_ESCROW_BALANCES_OF_USER
        : QUERY_ESCROW_BALANCES_OF_USER,
      { user: account }
    );

    console.debug(
      'YOLO getEscrowBalances',
      JSON.stringify(result, undefined, 2)
    );

    if (
      result?._meta?.block.number + SUBGRAPH_MAX_BLOCK_DELAY <
      (blockNumber ?? 0)
    ) {
      console.warn('Info fetched from subgraph might be stale');
    }

    const ebs = result?.escrowBalances;
    if (!ebs) {
      setBalances([]);
      return;
    }
    setBalances(
      ebs.map((eb: any) => {
        return {
          user: eb?.user?.id,
          tokenAddress: eb?.token?.assetAddress,
          tokenType: stringToStringAssetType(eb?.asset.assetType),
          tokenId: eb?.token?.assetId,
          blockNumber,
          amount: BigNumber.from(eb?.quantity as string),
        };
      })
    );
  }, [account, blockNumber, nonzero]);

  useEffect(() => {
    fetchEscrowBalances();
  }, [fetchEscrowBalances, account, blockNumber]);

  return balances;
};
