import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Media } from 'components';
import { useActiveWeb3React } from 'hooks';
import { Asset } from 'hooks/marketplace/types';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useHistory } from 'react-router-dom';
import { GlitchText } from 'ui';
import { truncateHexString } from 'utils';
import { StringAssetType } from 'utils/subgraph';
import { useStyles } from './TokenOwned.styles';
import { Fraction } from 'utils/Fraction';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';

export const TokenOwned = ({
  meta,
  staticData,
  asset,
}: {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  asset: Asset;
}) => {
  const {
    container,
    image,
    imageContainer,
    nameContainer,
    stockContainer,
    tokenName,
    mr,
    lastPriceContainer,
  } = useStyles();
  const { push } = useHistory();

  const { chainId } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides()

  //console.log('FRESH', {asset, action, actionColor})

  const handleImageClick = () => {
    push(`/token/${asset.assetType}/${asset.assetAddress}/${asset.assetId}`);
  };

  const decimals = decimalOverrides[staticData?.asset?.assetAddress?.toLowerCase()] ?? staticData?.decimals ?? 0

  const isErc721 =
    asset.assetType.valueOf() === StringAssetType.ERC721.valueOf();
 /*
 const sup = Fraction.from(staticData.
  const totalSupplyString = isErc721
    ? 'unique'
    : sup
    ? `${sup} pieces`
    : undefined;
  */
 const totalSupplyString = undefined

  return (
    <Paper className={container}>
      <div
        role="button"
        className={imageContainer}
        onClick={handleImageClick}
        onKeyPress={handleImageClick}
        tabIndex={0}
      >
        <Media uri={meta?.image} className={image} />
        {/*<img src={LootBox} style={{width: '100%', height: 'auto'}}/>*/}
      </div>
      <div className={nameContainer}>
        <GlitchText className={tokenName}>
          {['0xb654611f84a8dc429ba3cb4fda9fad236c505a1a', '0x1b30a3b5744e733d8d2f19f0812e3f79152a8777', '0x1974eeaf317ecf792ff307f25a3521c35eecde86'].includes(asset.assetAddress) ? meta?.name ?? truncateHexString(asset.assetId) : meta?.name ? `${meta?.name} #${truncateHexString(asset.assetId)}`: `#${truncateHexString(asset.assetId)}`}
        </GlitchText>
      </div>
      <div className={stockContainer}>
        {staticData?.symbol && (
          <Typography color="textSecondary">{staticData.symbol}</Typography>
        )}
        {totalSupplyString && (
          <Typography color="textSecondary">{totalSupplyString}</Typography>
        )}
      </div>
    </Paper>
  );
};
