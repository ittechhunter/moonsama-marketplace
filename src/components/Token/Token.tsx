import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Media } from 'components';
import { useLastTradedPriceOnce } from 'hooks/marketplace/useLastTradedPrice';
import { TokenData } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useHistory } from 'react-router-dom';
import { GlitchText, PriceBox } from 'ui';
import { truncateHexString } from 'utils';
import { Fraction } from 'utils/Fraction';
import { StringAssetType, StringOrderType } from 'utils/subgraph';
import { useStyles } from './Token.styles';
import LootBox from '../../assets/images/loot-box.png'
import { width } from '@mui/system';

export const Token = ({ meta, staticData }: TokenData) => {
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

  const asset = staticData.asset;

  const handleImageClick = () => {
    push(`/token/${asset.assetType}/${asset.assetAddress}/${asset.assetId}`);
  };

  const ltp = useLastTradedPriceOnce({
    assetAddress: asset.assetAddress,
    assetId: asset.assetId,
  });

  const color =
    ltp?.orderType.valueOf() === StringOrderType.BUY.valueOf()
      ? 'green'
      : '#b90e0e';

  //console.log('STATIC',{staticData})

  const isErc721 =
    asset.assetType.valueOf() === StringAssetType.ERC721.valueOf();
  const sup = staticData?.totalSupply?.toString();
  const totalSupplyString = isErc721
    ? 'unique'
    : sup
    ? `${sup} pieces`
    : undefined;

  return (
    <Paper className={container}>
      <div
        role="button"
        className={imageContainer}
        onClick={handleImageClick}
        onKeyPress={handleImageClick}
        tabIndex={0}
      >
        {/*<Media uri={meta?.image} className={image} /> *FIXME */}
        <img src={LootBox} style={{width: '100%', height: 'auto'}}/>
      </div>
      <div className={nameContainer}>
        <GlitchText className={tokenName}>{meta?.name ?? truncateHexString(asset.assetId)}</GlitchText>
        {ltp && <PriceBox margin={false} size="small" color={color}>
          {Fraction.from(ltp.unitPrice, 18)?.toFixed(0)} MOVR
        </PriceBox>}
      </div>
      <div className={stockContainer}>
        {staticData?.symbol && <Typography color="textSecondary">{staticData.symbol}</Typography>}

        {totalSupplyString && <Typography color="textSecondary">{totalSupplyString}</Typography>}
      </div>
      {/*{ltp && <div className={lastPriceContainer}>
        <Typography color="textSecondary" noWrap className={mr}>
          Last trade
        </Typography>
        <PriceBox margin={true} size="small" color='white'>
          {Fraction.from(ltp.unitPrice, 18)?.toFixed(2)} MOVR
        </PriceBox>
      </div>}*/}
    </Paper>
  );
};
