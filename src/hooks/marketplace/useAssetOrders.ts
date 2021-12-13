import { request } from 'graphql-request';
import { useBlockNumber } from 'state/application/hooks';
import { SUBGRAPH_MAX_BLOCK_DELAY, SUBGRAPH_URL } from '../../constants';
import { QUERY_ASSET_ORDERS } from '../../subgraph/orderQueries';
import { Order } from './types';
import { getAssetEntityId, parseOrder } from '../../utils/subgraph';
import { useState, useCallback, useEffect } from 'react';

export const useAssetOrders = (
  assetAddress: string,
  assetId: string,
  isBuy = false,
  onlyActive = false
) => {
  const blockNumber = useBlockNumber();

  const [orders, setOrders] = useState<Order[] | undefined>();

  const fetchAssetOrders = useCallback(async () => {
    const assetEntityId = getAssetEntityId(assetAddress, assetId);
    /*
    const result = blockNumber
      ? await request(SUBGRAPH_URL, QUERY_ASSET_ORDERS_AT_BLOCK(isBuy, onlyActive), {
          asset: assetEntityId,
          block: { number: blockNumber },
        })
      : await request(SUBGRAPH_URL, QUERY_ASSET_ORDERS(isBuy, onlyActive), { asset: assetEntityId });
  
    */
    const result = await request(
      SUBGRAPH_URL,
      QUERY_ASSET_ORDERS(isBuy, onlyActive, assetEntityId)
    );

    console.debug('YOLO getAssetOrders', result);

    if (
      result?._meta?.block.number + SUBGRAPH_MAX_BLOCK_DELAY <
      (blockNumber ?? 0)
    ) {
      console.warn('Info fetched from subgraph might be stale');
    }

    const orders = result?.orders;

    console.debug('YOLO getAssetOrders', { orders });

    if (!orders) {
      setOrders([]);
      return;
    }
    const res = orders.map((x: any) => parseOrder(x));
    setOrders(res);
  }, [assetAddress, assetId, blockNumber]);

  useEffect(() => {
    fetchAssetOrders();
  }, [fetchAssetOrders, blockNumber]);

  return orders;
};

export const useAssetOrdersCallback = (
  assetAddress: string,
  assetId: string,
  isBuy = false,
  onlyActive = false
) => {
  const fetchAssetOrders = useCallback(async () => {
    const assetEntityId = getAssetEntityId(assetAddress, assetId);

    const result = await request(
      SUBGRAPH_URL,
      QUERY_ASSET_ORDERS(isBuy, onlyActive, assetEntityId)
    );
    const orders = result?.orders;

    if (!orders) {
      return []
    }
    const res = orders.map((x: any) => parseOrder(x));
    return res
  }, [assetAddress, assetId, onlyActive, isBuy]);

  return fetchAssetOrders;
};
