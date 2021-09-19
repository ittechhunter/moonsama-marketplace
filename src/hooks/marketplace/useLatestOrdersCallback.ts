import { BigNumber } from '@ethersproject/bignumber';
import { Interface } from '@ethersproject/abi';
import { ChainId, DEFAULT_ORDERBOOK_PAGINATION, SUBGRAPH_URL } from '../../constants';
import { request } from 'graphql-request';
import { getAssetEntityId, parseOrder, StringAssetType } from 'utils/subgraph';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Asset, Order } from 'hooks/marketplace/types';
import { useFetchTokenUriCallback } from 'hooks/useFetchTokenUri.ts/useFetchTokenUriCallback';
import { QUERY_LATEST_ORDERS } from 'subgraph/orderQueries';


interface LatestOrdersResults {
  latestOrders?: Order[];
}

export const useLatestOrdersCallback = () => {

  const fetchLatestOrders = useCallback(async (
      from = 0,
      num = DEFAULT_ORDERBOOK_PAGINATION,
  ): Promise<Order[]> => {
    const query = QUERY_LATEST_ORDERS(
      from,
      num as number
    );
    const response = await request(SUBGRAPH_URL, query);

    console.debug('YOLO useLatestOrders', response);

    if (!response) {
      return [];
    }

    const latestOrders: Order[] = (response.latestOrders ?? [])
      .map((x: any) => parseOrder(x))
      .filter((item: Order | undefined) => !!item);

    return latestOrders;
  }, [])

  return fetchLatestOrders
}
