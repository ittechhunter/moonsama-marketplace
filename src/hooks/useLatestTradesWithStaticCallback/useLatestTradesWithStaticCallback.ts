import { SUBGRAPH_URL } from '../../constants';
import { request } from 'graphql-request';
import { inferOrderTYpe, OrderType, parseFillWithOrder } from 'utils/subgraph';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { useCallback } from 'react';
import { Asset, FillWithOrder, Order } from 'hooks/marketplace/types';
import { useTokenStaticDataCallbackArray } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { QUERY_LATEST_FILLS } from 'subgraph/fillQueries';

export const useLatestTradesWithStaticCallback = () => {

  const {chainId} = useActiveWeb3React()
  const staticCallback = useTokenStaticDataCallbackArray()

  const fetchLatestTradesWithStatic = useCallback(async (num : number, offset: number) => {
    const query = QUERY_LATEST_FILLS(
      offset,
      num
    );
    const response = await request(SUBGRAPH_URL, query);

    console.debug('YOLO useLatestTradesWithStaticCallback', response);

    if (!response) {
      return [];
    }
    
    let assets: Asset[] = []
    const latestFills: FillWithOrder[] = (response.latestFills ?? [])
      .map((x: any) => {
            const pfo = parseFillWithOrder(x)
            if (pfo) {
                const ot = inferOrderTYpe(chainId, pfo?.order?.sellAsset, pfo?.order?.buyAsset) ?? OrderType.SELL
                assets.push(ot === OrderType.BUY ? pfo?.order?.buyAsset: pfo?.order?.sellAsset)
            }
            return pfo
        })
      .filter((item: Order | undefined) => !!item);

    const staticDatas = await staticCallback(assets)

    const datas = staticDatas.map((sd, i) => {
        return {
            meta: sd.meta,
            staticData: sd.staticData,
            fill: latestFills[i]
        }
    })
    return datas;
  }, [chainId])

  return fetchLatestTradesWithStatic
}
