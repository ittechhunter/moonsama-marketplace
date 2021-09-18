import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import { SUBGRAPH_MAX_BLOCK_DELAY, SUBGRAPH_URL } from '../../constants';
import { QUERY_ACTIVE_ORDERS, QUERY_ORDERS } from '../../subgraph/orderQueries';
import { Order } from './types';
import { parseOrder } from '../../utils/subgraph';
import { useActiveWeb3React } from 'hooks';
import { useState, useCallback, useEffect } from 'react';

// these orders do not have the strategy objects attached
export const useSellerOrders = (onlyActive = false) => {
  const { account } = useActiveWeb3React();
  const blockNumber = useBlockNumber();

  const [orders, setOrders] = useState<Order[] | undefined>();

  const fetchOrders = useCallback(async () => {
    if (!account) {
      return;
    }
    /*
        const result = blockNumber
        ? await request(
            SUBGRAPH_URL,
            onlyActive ? QUERY_ACTIVE_ORDERS_AT_BLOCK : QUERY_ORDERS_AT_BLOCK,
            { seller: sellerAddress.toLowerCase(), block: { number: blockNumber } }
            )
        : await request(SUBGRAPH_URL, onlyActive ? QUERY_ACTIVE_ORDERS : QUERY_ORDERS, {
            seller: sellerAddress.toLowerCase(),
            });
        */

    const result = await request(
      SUBGRAPH_URL,
      onlyActive ? QUERY_ACTIVE_ORDERS : QUERY_ORDERS,
      {
        seller: account.toLowerCase(),
      }
    );
    console.debug('YOLO getOrders', result);

    if (
      result?._meta?.block.number + SUBGRAPH_MAX_BLOCK_DELAY <
      (blockNumber ?? 0)
    ) {
      console.warn('Info fetched from subgraph might be stale');
    }

    const orders = result?.orders;

    console.debug('YOLO getOrders', { orders });

    if (!orders) {
      setOrders([]);
      return;
    }
    const res = orders.map((x: any) => parseOrder(x));
    setOrders(res);
  }, [account, blockNumber]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, account, blockNumber]);
};
