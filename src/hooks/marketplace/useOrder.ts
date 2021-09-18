import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import { SUBGRAPH_MAX_BLOCK_DELAY, SUBGRAPH_URL } from '../../constants';
import { QUERY_ORDER } from '../../subgraph/orderQueries';
import { Order } from './types';
import { parseStrategy, parseOrder } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';

const fetchOrderFromSubgraph = async (
  orderHash: string,
  blockNumber: number | undefined
) => {
  const result = await request(SUBGRAPH_URL, QUERY_ORDER, { orderHash });

  console.debug('YOLO getOrder', result);

  if (
    result?._meta?.block.number + SUBGRAPH_MAX_BLOCK_DELAY <
    (blockNumber ?? 0)
  ) {
    console.warn('Info fetched from subgraph might be stale');
  }

  const raworder = result?.order;
  const rawstrategy = result?.strategy;

  const porder = parseOrder(raworder);
  const strategy = parseStrategy(rawstrategy);

  console.debug('YOLO getOrder ', { porder, strategy });

  if (!porder || !strategy) {
    return undefined;
  }

  porder.strategy = strategy;
  return porder;
};

export const useOrder = (orderHash: string) => {
  const blockNumber = useBlockNumber();

  const [order, setOrder] = useState<Order | undefined>();

  const fetchOrder = useCallback(async () => {
    const order = await fetchOrderFromSubgraph(orderHash, blockNumber);
    setOrder(order);
  }, [orderHash, blockNumber]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder, orderHash, blockNumber]);

  return order;
};

// THIS IS WRONG IT SHOULD BE 1 CALL NOT 1 CALL PER ORDER !! JUST FOR DEV
export const useOrders = (ordersHashes: string[]) => {
  const blockNumber = useBlockNumber();

  const [orders, setOrders] = useState<Order[] | undefined>([]);

  const fetchOrders = useCallback(async () => {
    const orders = await Promise.all(
      ordersHashes.map(async (orderHash) => {
        const order = await fetchOrderFromSubgraph(orderHash, blockNumber);
        return order;
      })
    );

    const filteredOrders = orders.filter(Boolean) as Order[];

    setOrders(filteredOrders);
  }, [ordersHashes, blockNumber]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, ordersHashes, blockNumber]);

  return orders;
};
