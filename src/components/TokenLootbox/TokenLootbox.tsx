import { Paper, Typography, Button, Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import {DoDisturb} from '@mui/icons-material';
import { truncateHexString } from 'utils';
import { styles } from './TokenLootbox.styles';
import { Fraction } from 'utils/Fraction';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import { useFetchTokenUri } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import {
  StringAssetType,
} from '../../utils/subgraph';
import { useBlueprint } from 'hooks/loot/useBlueprint'
import { Asset } from 'hooks/marketplace/types';
import { useAllowances } from 'hooks/useApproveCallback/useApproveCallback';
import { WORKBENCH_ADDRESSES, ChainId } from '../../constants';
import { BigNumber } from '@ethersproject/bignumber';
import { Media, MintResourceApproveItem } from 'components';
import { useState } from 'react';
import { GlitchText, NavLink } from 'ui';
import { CraftCallbackState, useCraftCallback } from 'hooks/loot/useCraftCallback';

export const TokenLootbox = (asset: Asset) => {
  const {
    container,
    image,
    imageContainer,
    price,
    buttonsContainer,
    name,
    newSellButton,
    transferButton,
    dialogContainer,
  } = useClasses(styles);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const { chainId, account } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides();
  const blueprintId = '2'
  const blueprint = useBlueprint(blueprintId); // 2 for prod
  const craftCallback = useCraftCallback({amount: '1', blueprintId})

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

  const lootboxStaticData = useTokenStaticData([asset]);
  const lootboxMeta = useFetchTokenUri(lootboxStaticData)?.[0];


  const inputAssets = blueprint?.inputs.map(input => ({
    id: input.assetAddress + input.assetId,
    assetId: input.assetId,
    assetType: input.assetType,
    assetAddress: input.assetAddress.toLowerCase(),
    amount: input.amount,
  }))

  const inputsStaticData = useTokenStaticData(inputAssets ?? []);
  const inputMetas = useFetchTokenUri(inputsStaticData);
  const inputsBalanceData = useTokenBasicData(inputAssets ?? []);

  const items = inputAssets?.map((asset, i) => {
    const decimals = decimalOverrides[asset.assetAddress] ?? inputsBalanceData?.[i]?.decimals ?? 0;
    console.log({decimals})
    const isFungible = decimals > 0;
    let target = isFungible
      ? Fraction.from(
        asset.amount?.toString() ?? '0',
        decimals
      )?.toSignificant(5) ?? '0'
      : asset.amount?.toString() ?? '0';
    const name = inputMetas[i]?.name ? inputMetas[i]?.name : '';
    return {
      asset,
      target,
      name,
      decimals
    }
  })!

  const allowances = useAllowances(
    inputAssets?.map(x => {
      return {...x, operator: WORKBENCH_ADDRESSES[chainId ?? ChainId.MOONRIVER]}
    }) ?? [],
    account ?? undefined
  )

  let approvalNeeded = false 
  allowances?.map((x, i) => {
    if (BigNumber.from(inputAssets?.[i].amount ?? '0').gt(x ?? '0')) {
      console.log('YOLO',inputAssets?.[i].amount, x)
      approvalNeeded = true
    }
  })

  let userHasEnough = true 
  inputsBalanceData?.map((x, i) => {
    if (BigNumber.from(inputAssets?.[i].amount ?? '0').lt(x.userBalance ?? '0')) {
      userHasEnough = false
    }
  })


  console.log(lootboxMeta)

  return (
    <Paper className={container}>
      <div
        style={{ cursor: 'pointer' }}
      >
        <div role="button" className={imageContainer} tabIndex={0}>
          <Media uri={lootboxMeta?.image} className={image} />
        </div>
        <GlitchText
          variant="h1"
          className={name}
        >
          {lootboxMeta?.name ??
            lootboxMeta?.title ??
            truncateHexString(asset?.assetAddress)}
        </GlitchText>

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
              {`Still available: ${mintable}`}
            </Typography>
          }
        </Box>

        <div>
          <GlitchText
            variant="h1"
            className={name}
          >
            Crafting cost
          </GlitchText>
          {console.log(items)}
          {items?.map((item, index) =>
            <Typography color="textSecondary" variant="subtitle1" key={index}>
              {`${item?.target} ${item?.name}`}
            </Typography>)
          }
        </div>

        <Dialog
          fullWidth={true}
          open={approveDialogOpen}
          onClose={() => {
            setApproveDialogOpen(false)
          }}
          title={"Approve Resources"}
        >
          <div className={dialogContainer}>
          { items?.map((item, index) => {
            //console.log('item map shin', item)
            return (
            <MintResourceApproveItem
              key={index}
              {...item.asset}
              assetName={item.name}
            />
            );
          }
            )
          }
            </div>
        </Dialog>

        <div>
          {
            userHasEnough ? <NavLink href="/collection/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/0">
                <Button
                  startIcon={<DoDisturb />}
                  variant="outlined"
                  color="primary"
                  className={newSellButton}
                >
                  Not enough resources↗
                </Button>
              </NavLink>
              : approvalNeeded ?
                <Box
                  className={buttonsContainer}
                  style={{ justifyContent: 'space-around' }}
                >
                  <Button
                    onClick={() => {
                      setApproveDialogOpen(true);
                    }}
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
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      await craftCallback?.callback?.()
                    }}
                    disabled={craftCallback.state === CraftCallbackState.INVALID}
                  >
                    Craft
                  </Button>
                </Box>
          }
        </div>
      </div>
    </Paper >
  );
};
