import { Paper, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Media } from 'components';
import { GlitchText } from 'ui';
import { truncateHexString } from 'utils';
import { styles } from './TokenLootbox.styles';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { Order } from 'hooks/marketplace/types';
import { Fraction } from 'utils/Fraction';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import {
  StringAssetType,
} from '../../utils/subgraph';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useBlueprint } from 'hooks/loot/useBlueprint'
import { TokenLootboxInput } from './TokenLootboxInput'
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
  const { chainId, account } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides();
  const blueprint = useBlueprint("1"); // 2 for prod

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
        <Box className={price}>
          {
            <Typography color="textSecondary" variant="subtitle1">
              {`Mintable ${mintable}${totalSupplyString ? ` OF ${totalSupplyString}` : ''
                }`}
            </Typography>
          }
        </Box>

        <div>
          <Typography color="textSecondary" variant="subtitle1">
            Require:
          </Typography>
          {blueprint?.inputs.map((input, i) => {
            const data = {
              id: input.assetAddress + input.assetId,
              assetId: input.assetId,
              assetType: input.assetType,
              assetAddress: input.assetAddress,
            };
            return (
              <TokenLootboxInput {...data} key={i} />
            )
          })}
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
    </Paper >
  );
};
