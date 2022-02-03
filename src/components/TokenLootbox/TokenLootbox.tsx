import { Paper, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Media } from 'components';
import { GlitchText, PriceBox } from 'ui';
import { truncateHexString } from 'utils';
import { styles } from './TokenLootbox.styles';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { Order } from 'hooks/marketplace/types';
import { Fraction } from 'utils/Fraction';
import { useEffect, useState } from 'react';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useMemo } from 'react';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import {
  StringAssetType,
} from '../../utils/subgraph';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  UserCollection,
  useFetchUserItem,
} from 'hooks/useFetchUserItem/useFetchUserItem';
import { AddressZero } from '@ethersproject/constants';

export interface TokenData {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  order?: Order | undefined;
}

export const TokenLootbox = ({ meta, staticData, order }: TokenData) => {
  const {
    container,
    image,
    imageContainer,
    nameContainer,
    stockContainer,
    price,
    buttonsContainer,
    name,
  } = useClasses(styles);
  console.log('staticData', staticData);
  console.log('meta', meta);
  console.log('order  ', order);

  const asset = staticData.asset;

  const { chainId, account } = useActiveWeb3React();
  const getPaginatedItems = useFetchUserItem();

  const assetsMain = useMemo(() => {
    return [asset];
  }, [chainId, asset.assetAddress, asset.assetType, asset.assetId]);

  const getCollectionById = async () => {
    const data = await getPaginatedItems(account ?? AddressZero);
    const multi_array = data['Multiverse Asset Factory'];
    console.log("data:", multi_array)
  };
  getCollectionById();


  const balanceData = useTokenBasicData(assetsMain);
  console.log('balanceData', balanceData);
  const decimalOverrides = useDecimalOverrides();
  const decimals = decimalOverrides[asset.assetAddress] ?? balanceData?.[0]?.decimals ?? 0;
  const isFungible = decimals > 0;

  let userBalanceString = isFungible
    ? Fraction.from(
      balanceData?.[0]?.userBalance?.toString() ?? '0',
      decimals
    )?.toFixed(2) ?? '0'
    : balanceData?.[0]?.userBalance?.toString() ?? '0';
  userBalanceString = account ? userBalanceString : '0';

  let totalSupplyString = balanceData?.[0]?.totalSupply
    ? isFungible
      ? Fraction.from(
        balanceData?.[0]?.totalSupply?.toString() ?? '0',
        decimals
      )?.toFixed(2) ?? '0'
      : balanceData?.[0]?.totalSupply?.toString()
    : asset.assetType.valueOf() === StringAssetType.ERC721
      ? '1'
      : undefined;



  return (
    <Paper className={container}>
      <div
        style={{ cursor: 'pointer' }}
      >
        <div role="button" className={imageContainer} tabIndex={0}>
          <Media uri={meta?.image} className={image} />
        </div>
        <GlitchText
          variant="h1"
          className={name}
          style={{ textAlign: 'left', margin: 0 }}
        >
          {meta?.name ??
            meta?.title ??
            truncateHexString(asset?.assetAddress)}
        </GlitchText>
        {/* <div className={nameContainer}>
          <GlitchText
            className={tokenName}
            variant="h2"
            style={{ margin: '12px 0' }}
          >
            {meta?.description}
          </GlitchText>
        </div> */}

        <Box className={price}>
          {
            <Typography color="textSecondary" variant="subtitle1">
              {`OWNED ${userBalanceString}${totalSupplyString ? ` OF ${totalSupplyString}` : ''
                }`}
            </Typography>
          }
        </Box>
        <div>
          <Typography color="textSecondary" variant="subtitle1">
            Require:
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            850 Wood <br />
            2200 Stone<br />
            330 Iron<br />
            100 Gold<br />
          </Typography>
        </div>


        <div className={stockContainer}>
          {/* {staticData?.symbol && (
            <Typography color="textSecondary">{`${staticData.symbol} #${asset.assetId}`}</Typography>
          )}
          {totalSupplyString && (
            <Typography color="textSecondary">{totalSupplyString}</Typography>
          )} */}
        </div>
        <Box
          className={buttonsContainer}
          style={{ justifyContent: 'space-around' }}
        >
          <Button
            style={{ background: 'green' }}
            startIcon={<AccountBalanceWalletIcon />}
            variant="contained"
            color="primary"
          >
            Buy
          </Button>
        </Box>
      </div>
    </Paper>
  );
};
