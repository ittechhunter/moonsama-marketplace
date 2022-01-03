import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Media } from 'components';
import { useHistory } from 'react-router-dom';
import { GlitchText, PriceBox } from 'ui';
import { truncateHexString } from 'utils';
import { Fraction } from 'utils/Fraction';
import {
  getDisplayUnitPrice,
  OrderType,
  StringAssetType,
  stringToOrderType,
} from 'utils/subgraph';
import { styles } from './Token.styles';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { Order } from 'hooks/marketplace/types';
import { useEffect, useState } from 'react';
import { useAssetOrdersCallback } from 'hooks/marketplace/useAssetOrders';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import { useClasses } from 'hooks';

export interface TokenData {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  order?: Order | undefined;
}

export const Token = ({ meta, staticData, order }: TokenData) => {
  const {
    container,
    image,
    imageContainer,
    nameContainer,
    stockContainer,
    tokenName,
    mr,
    lastPriceContainer,
  } = useClasses(styles);
  const { push } = useHistory();
  const [fetchedOrder, setFetchedOrer] = useState<Order | undefined>(undefined);
  const decimalOverrides = useDecimalOverrides();

  const asset = staticData.asset;

  const handleImageClick = () => {
    push(`/token/${asset.assetType}/${asset.assetAddress}/${asset.assetId}`);
  };

  /*
  const ltp = useLastTradedPriceOnce({
    assetAddress: asset.assetAddress,
    assetId: asset.assetId,
  });
  */

  const getOrderCB = useAssetOrdersCallback(
    asset.assetAddress,
    asset.assetId,
    false,
    true
  );

  useEffect(() => {
    console.log('useEffect run!');
    const fetch = async () => {
      const os: Order[] = await getOrderCB();
      const o: Order | undefined = os.reduce(
        (prev: Order | undefined, current: Order | undefined) => {
          if (prev && current) {
            if (prev.pricePerUnit.lt(current.pricePerUnit)) {
              return prev;
            } else {
              return current;
            }
          }
          return current;
        },
        undefined
      );
      console.log('useEffect run fetch', { os, o });
      if (o) {
        setFetchedOrer(o);
      }
    };
    if (!order) {
      fetch();
    }
  }, []);

  const finalOrder = order ?? fetchedOrder;

  const orderType = stringToOrderType(finalOrder?.orderType);

  /*
  const color =
    ltp?.orderType.valueOf() === StringOrderType.BUY.valueOf()
      ? 'green'
      : '#b90e0e';
  */
  //console.log('STATIC',{staticData})

  //console.log('ORDERTYPE', { orderType, original: finalOrder?.orderType })
  const color = orderType === OrderType.BUY ? 'green' : '#b90e0e';

  const decimals =
    decimalOverrides[staticData?.asset?.assetAddress?.toLowerCase()] ??
    staticData?.decimals ??
    0;
  const isErc721 =
    asset.assetType.valueOf() === StringAssetType.ERC721.valueOf();

  const sup = Fraction.from(
    staticData?.totalSupply?.toString() ?? '0',
    decimals
  )?.toFixed(0);

  const displayPPU = getDisplayUnitPrice(
    decimals,
    5,
    orderType,
    finalOrder?.askPerUnitNominator,
    finalOrder?.askPerUnitDenominator,
    true
  );

  const totalSupplyString =
    isErc721 || sup?.toString() === '1'
      ? 'unique'
      : sup
      ? `${sup} pieces`
      : undefined;

  return (
    <Paper className={container}>
      <div
        onClick={handleImageClick}
        onKeyPress={handleImageClick}
        style={{ cursor: 'pointer' }}
      >
        <div role="button" className={imageContainer} tabIndex={0}>
          <Media uri={meta?.image} className={image} />
          {/*<img src={LootBox} style={{width: '100%', height: 'auto'}}/>*/}
        </div>
        <div className={nameContainer}>
          <GlitchText
            className={tokenName}
            variant="h1"
            style={{ margin: '12px 0' }}
          >
            {/** FIXME BLACKLIST */}
            {meta?.name
              ? `${meta?.name}${
                  asset.assetAddress.toLowerCase() ===
                  '0xfEd9e29b276C333b2F11cb1427142701d0D9f7bf'.toLowerCase()
                    ? ` #${truncateHexString(asset.assetId)}`
                    : ''
                }`
              : truncateHexString(asset.assetId)}
          </GlitchText>
          {displayPPU && displayPPU !== '?' && (
            <PriceBox margin={false} size="small" color={color}>
              {displayPPU} MOVR
            </PriceBox>
          )}
        </div>
        <div className={stockContainer}>
          {staticData?.symbol && (
            <Typography color="textSecondary">{`${staticData.symbol} #${asset.assetId}`}</Typography>
          )}

          {totalSupplyString && (
            <Typography color="textSecondary">{totalSupplyString}</Typography>
          )}
        </div>
        {/*{ltp && <div className={lastPriceContainer}>
        <Typography color="textSecondary" noWrap className={mr}>
          Last trade
        </Typography>
        <PriceBox margin={true} size="small" color='white'>
          {Fraction.from(ltp.unitPrice, 18)?.toFixed(2)} MOVR
        </PriceBox>
      </div>}*/}
      </div>
    </Paper>
  );
};
