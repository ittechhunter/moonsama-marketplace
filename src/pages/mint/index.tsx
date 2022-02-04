import Grid from '@mui/material/Grid';
import { TokenLootbox as TokenLootboxComponent } from 'components';
import { useClasses } from 'hooks';
import { Asset } from 'hooks/marketplace/types';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useEffect, useState } from 'react';
import { Filters, GlitchText, Loader } from 'ui';
import {
  getAssetEntityId,
  StringAssetType
} from 'utils/subgraph';
import { styles } from './styles';


const MintPage = () => {
  const address = "0x9984440FB82f1aF013865141909276d26B86E303";
  const assetType = StringAssetType.ERC1155;
  const asset: Asset = {
    assetAddress: address?.toLowerCase(),
    assetType: assetType,
    assetId: '1',
    id: getAssetEntityId(address?.toLowerCase(), '0'),
  };

  const data = useTokenStaticData([asset])

  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const {
    placeholderContainer,
    container
  } = useClasses(styles);


  //console.log('before FETCH', { searchSize, address, take, paginationEnded, searchCounter, filters });
  useEffect(() => {
    if (!!data) {
      setPageLoading(false)
    }
  }, [
    JSON.stringify(data),
  ]);

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">Workbench</GlitchText>
      </div>
      <Grid container alignContent="center">
        <Grid
            item
            xs={12}
            md={6}
            lg={3}
          >
            <TokenLootboxComponent {...asset} />
          </Grid>
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default MintPage;
