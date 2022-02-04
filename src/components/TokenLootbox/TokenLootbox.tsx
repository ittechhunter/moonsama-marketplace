import { Paper, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import MoneyIcon from '@mui/icons-material/Money';
import SyncAltIcon from '@mui/icons-material/SyncAltSharp';
import { Media } from 'components';
import { GlitchText, NavLink } from 'ui';
import { truncateHexString } from 'utils';
import { styles } from './TokenLootbox.styles';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { Order } from 'hooks/marketplace/types';
import { Fraction } from 'utils/Fraction';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import { useFetchTokenUri } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import {
  StringAssetType,
} from '../../utils/subgraph';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useBlueprint } from 'hooks/loot/useBlueprint'
import { useCraftCallback } from 'hooks/loot/useCraftCallback'
import { Asset } from 'hooks/marketplace/types';
import React, { useEffect, useState } from 'react';
import { useApproveDialog } from 'hooks/useApproveDialog/useApproveDialog';

export interface TokenData {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  order?: Order | undefined;
}

interface Item {
  target: string | undefined;
  current: string;
  name: string | undefined;
}

export const TokenLootbox = ({ meta, staticData, order }: TokenData) => {
  const {
    container,
    image,
    imageContainer,
    price,
    buttonsContainer,
    name,
    newSellButton,
    transferButton,
  } = useClasses(styles);
  const { chainId, account } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides();
  const blueprint = useBlueprint("1"); // 2 for prod
  let notEnough = false;
  let approve = true;
  const { setApproveData, setApproveDialogOpen } = useApproveDialog();

  const asset = staticData.asset;
  const balanceData = useTokenBasicData([asset]);
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

  let mintable = blueprint?.availableToMint.toString() ?? '0'

  // const TokenLootboxInput = (): Item[] => {
  //   const assets = blueprint?.inputs.map(input => ({
  //     id: input.assetAddress + input.assetId,
  //     assetId: input.assetId,
  //     assetType: input.assetType,
  //     assetAddress: input.assetAddress,
  //     amount: input.amount,
  //   }))

  //   const staticData = useTokenStaticData(assets!);
  //   const metas = useFetchTokenUri(staticData);
  //   const balanceData = useTokenBasicData(assets!);
  //   return assets?.map((asset, i) => {
  //     const decimals = decimalOverrides[asset.assetAddress] ?? balanceData?.[i]?.decimals ?? 0;
  //     const isFungible = decimals > 0;
  //     let userItemCount = isFungible
  //       ? Fraction.from(
  //         balanceData?.[i]?.userBalance?.toString() ?? '0',
  //         decimals
  //       )?.toFixed(2) ?? '0'
  //       : balanceData?.[i]?.userBalance?.toString() ?? '0';
  //     userItemCount = account ? userItemCount : '0';
  //     const target = assets[i].amount ? assets[i].amount?.toString() : '0';
  //     const name = metas[i]?.name ? metas[i]?.name : '';
  //     if (!notEnough && target && target >= userItemCount) notEnough = true;
  //     return {
  //       'target': target,
  //       'current': userItemCount,
  //       'name': name,
  //     }
  //   })!
  // };
  // let items: Item[] = TokenLootboxInput();

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
        <Box className={price}>
          {
            <Typography color="textSecondary" variant="subtitle1">
              {`Mintable ${mintable}${totalSupplyString ? ` OF ${totalSupplyString}` : ''
                }`}
            </Typography>
          }
        </Box>

        {/* <div>
          <Typography color="textSecondary" variant="subtitle1">
            Require:
          </Typography>
          {console.log(items)}
          { items?.map((item, index) =>
            <Typography color="textSecondary" variant="subtitle1" key={index}>
              {`Need ${item?.target} OF ${item?.current} ${item?.name}`}
            </Typography>)
          }
        </div> */}

        <div>
          {
            notEnough ?
              <NavLink href="/collection/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/0">
                <Button
                  startIcon={<SyncAltIcon />}
                  variant="outlined"
                  color="primary"
                  className={newSellButton}
                >
                  Not enough resources to craft↗
                </Button>
              </NavLink>
              : approve ?
                <Box
                  className={buttonsContainer}
                  style={{ justifyContent: 'space-around' }}
                >
                  <Button
                    onClick={() => {
                      setApproveDialogOpen(true);
                      setApproveData({ asset, decimals });
                    }}
                    startIcon={<MoneyIcon />}
                    variant="contained"
                    color="primary"
                    className={transferButton}
                  >
                    Approve
                  </Button>
                </Box>
                :
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
          }
        </div>
      </div>
    </Paper >
  );
};
