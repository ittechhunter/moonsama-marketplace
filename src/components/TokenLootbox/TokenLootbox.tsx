import { Paper, Typography, Button } from '@mui/material';
import Grow from '@mui/material/Grow';
import DialogUI from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import MoneyIcon from '@mui/icons-material/Money';
import { Media, MintResourceApproveItem } from 'components';
import { GlitchText, NavLink, Dialog } from 'ui';
import { DoDisturb } from '@mui/icons-material';
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
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useBlueprint } from 'hooks/loot/useBlueprint'
import { Asset } from 'hooks/marketplace/types';
import React, { useEffect, useState, useRef } from 'react';
import { useApproveDialog } from 'hooks/useApproveDialog/useApproveDialog';
import { useTransferDialog } from 'hooks/useTransferDialog/useTransferDialog';
import { useAllowances } from 'hooks/useApproveCallback/useApproveCallback';
import { useLootboxOpen, OpenData, RewardData, Reward } from 'hooks/loot/useLootboxOpen';
import { WORKBENCH_ADDRESSES, ChainId } from '../../constants';
import { BigNumber } from '@ethersproject/bignumber';
import samaboxOpenVideo from 'assets/samabox/samabox.mp4';


interface Item {
  asset: any;
  target: string | undefined;
  current: string;
  name: string | undefined;
}
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
    lootCardContainer,
    commonLoot,
    uncommonLoot,
    rareLoot,
    epicLoot,
    legendaryLoot,
    lootboxResultContainer,
  } = useClasses(styles);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [openBoxDialogOpen, setOpenBoxDialogOpen] = useState(false)
  const { chainId, account } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides();
  const blueprint = useBlueprint("1"); // 2 for prod
  let notEnough = false;
  let approve = true;

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
    assetAddress: input.assetAddress,
    amount: input.amount,
  }))

  const inputsStaticData = useTokenStaticData(inputAssets ?? []);
  const inputMetas = useFetchTokenUri(inputsStaticData);
  const inputsBalanceData = useTokenBasicData(inputAssets ?? []);

  const items = inputAssets?.map((asset, i) => {
    const decimals = decimalOverrides[asset.assetAddress] ?? balanceData?.[i]?.decimals ?? 0;
    const isFungible = decimals > 0;
    let userItemCount = isFungible
      ? Fraction.from(
        balanceData?.[i]?.userBalance?.toString() ?? '0',
        decimals
      )?.toFixed(2) ?? '0'
      : balanceData?.[i]?.userBalance?.toString() ?? '0';
    userItemCount = account ? userItemCount : '0';
    const target = inputAssets[i].amount ? inputAssets[i].amount?.toString() : '0';
    const name = inputMetas[i]?.name ? inputMetas[i]?.name : '';
    return {
      'asset': asset,
      'target': target,
      'current': userItemCount,
      'name': name,
    }
  })!

  const allowances = useAllowances(
    inputAssets?.map(x => {
      return { ...x, operator: WORKBENCH_ADDRESSES[chainId ?? ChainId.MOONRIVER] }
    }) ?? [],
    account ?? undefined
  )

  let approvalNeeded = false
  allowances?.map((x, i) => {
    if (BigNumber.from(inputAssets?.[i].amount ?? '0').gt(x ?? '0')) {
      approvalNeeded = true
    }
  })

  let userHasEnough = true
  inputsBalanceData?.map((x, i) => {
    if (BigNumber.from(inputAssets?.[i].amount ?? '0').lt(x.userBalance ?? '0')) {
      userHasEnough = false
    }
  })


  const { callback } = useLootboxOpen({ lootboxId: '0x9984440fb82f1af013865141909276d26b86e303-1-1' } as OpenData);
  const openVidRef = useRef<any>(null)
  const [videoPlay, setvideoPlay] = useState(false)
  const [confirmButtonShow, setConfirmButtonShow] = useState(false)

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
            {items?.map((item, index) => {
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
            userHasEnough ?
              <NavLink href="/collection/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/0">
                <Button
                  startIcon={<DoDisturb />}
                  variant="outlined"
                  color="primary"
                  className={newSellButton}
                >
                  Not enough resources to craft↗
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
                    startIcon={<AccountBalanceWalletIcon />}
                    variant="contained"
                    color="primary"
                  >
                    Craft
                  </Button>
                </Box>
          }
        </div>

        <DialogUI
          className={dialogContainer}
          fullWidth={true}
          open={openBoxDialogOpen}
          onClose={() => {
            setOpenBoxDialogOpen(false)
          }}
          maxWidth="lg"
        >
          <video ref={openVidRef} style={{ width: '100%' }} playsInline src={samaboxOpenVideo} poster="samabox_unopened.jpg">
          </video>
          {!videoPlay ?
            <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
            >
              <Button onClick={() => {
                openVidRef?.current?.play();
                setvideoPlay(true)
                setTimeout(() => {
                  setConfirmButtonShow(true)
                }, 5500)
              }}
              >
                <GlitchText
                  style={{ width: '100%', color: 'white' }}
                  variant="h1">
                  Click to Open</GlitchText></Button>
            </div> :

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', textAlign: 'center', height: '100%', flexDirection: 'column'}}>
              <div className={lootboxResultContainer} style={{ width: '60%' }}>

                <Grow style={{marginLeft: 30, transitionDelay: `5000ms`}} in={true}>
                  <div className={`${lootCardContainer} ${rareLoot}`}>
                    <img className={imageContainer} src="https://moonsama.mypinata.cloud/ipfs/QmXdPz7YgmtiHnEY58MxAqRxGncqvsuc3KBnyuXU9vHub8" />
                    <span className="name">Moonshine Moonbrella</span>
                    <span className="asset-id">#5</span>
                  </div></Grow>
                <Grow style={{marginLeft: 30, transitionDelay: `5200ms`}} in={true}>
                  <div className={`${lootCardContainer} ${epicLoot}`}>
                    <img className={imageContainer} src="https://moonsama.mypinata.cloud/ipfs/QmP99Umwc4GbVNcxqKh9agywJHRBv9N1YnepaEjECRSKfc" />
                    <span className="name">Blood Moon Sword</span>
                    <span className="asset-id">#30</span>
                  </div></Grow>

                <Grow style={{marginLeft: 30, transitionDelay: `5400ms`}} in={true}>
                  <div className={`${lootCardContainer} ${commonLoot}`}>
                    <img className={imageContainer} src="https://moonsama.mypinata.cloud/ipfs/QmejQBPzsmXVXhdHudbvcihYoR5rX4wD3U2ArgHR7aMF4x" />
                    <span className="name">Amethyst Short Sword</span>
                    <span className="asset-id">#49</span>
                  </div></Grow>
              </div>
              {confirmButtonShow && 
              <Button onClick={() => { setOpenBoxDialogOpen(false) }} variant="contained"
                color="primary"
              ><Typography variant="h4">Nice!</Typography></Button>}
            </div>
          }
        </DialogUI>
        {Number(userBalanceString) == 0 && (
          <Box
            className={buttonsContainer}
            style={{ justifyContent: 'space-around' }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                if (callback)
                  callback().then((res) => {
                    console.log(res)
                    setOpenBoxDialogOpen(true)
                  })
              }}
            >
              Open
            </Button>
          </Box>)}
      </div>
    </Paper >
  );
};
