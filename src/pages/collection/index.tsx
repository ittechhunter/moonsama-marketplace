import { BigNumber } from '@ethersproject/bignumber'
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { Token as TokenComponent } from 'components';
import { GlitchText, Placeholder } from 'ui';
import { useCallback, useEffect, useState } from 'react';
import { getAssetEntityId, StringAssetType, stringToStringAssetType } from 'utils/subgraph';
import { truncateHexString } from 'utils';
import { Asset } from 'hooks/marketplace/types';
import { isAddress } from '@ethersproject/address';
import { StaticTokenData, useTokenStaticDataCallback } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useStyles } from './styles';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from "react-hook-form";

const PAGE_SIZE = 10

const CollectionPage = () => {
  const [collection, setCollection] = useState<{
    meta: TokenMeta | undefined;
    staticData: StaticTokenData;
  }[]>([]);
  const { address, type } = useParams<{ address: string; type: string }>();
  const assetType = stringToStringAssetType(type);
  const [take, setTake] = useState<number>(1)
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const { placeholderContainer, container } = useStyles()
  const {register, handleSubmit} = useForm()

  const asset: Asset = {
    assetAddress: address?.toLowerCase(),
    assetType: assetType,
    assetId: '0',
    id: getAssetEntityId(address?.toLowerCase(), '0')
  }

  const getPaginatedItems = useTokenStaticDataCallback(asset)

  const handleScrollToBottom = useCallback(() => {
    setTake(state => state += PAGE_SIZE)
  }, [])

  const handleTokenSearch = useCallback(async ({tokenID}) => {
    if (tokenID) {
      setPaginationEnded(true)
      setPageLoading(true)
      const data = await getPaginatedItems(1, BigNumber.from(tokenID))
      setPageLoading(false)
      setCollection(data)
    } else {
      setPaginationEnded(false)
      setPageLoading(true)
      const data = await getPaginatedItems(PAGE_SIZE, BigNumber.from(take))
      setPageLoading(false)
      setCollection(data)
    }
  }, [])

  useBottomScrollListener(handleScrollToBottom, { offset: 400 })

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true)
      const data = await getPaginatedItems(PAGE_SIZE, BigNumber.from(take))
      setPageLoading(false)

      const isEnd = data.some(({ meta }) => !meta)
      const pieces = data.filter(({meta}) => !!meta)

      //console.log('IS END', {paginationEnded, isEnd, pieces, data})

      if (isEnd) {
        setPaginationEnded(true)
        setCollection(state => state.concat(pieces));
        return
      }
      setCollection(state => state.concat(data));
    };
    if (!paginationEnded) {
      getCollectionById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, take, paginationEnded]);


  if (assetType.valueOf() === StringAssetType.UNKNOWN) {
    throw Error('Asset type was not recognized')
  }
  if (!isAddress(address)) {
    throw Error('Address format is incorrect')
  }

  return (
    <>
      <div className={container}
      >
        <GlitchText fontSize={48}>
          Collection {truncateHexString(address)}
        </GlitchText>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <TextField placeholder='Search by token ID' variant='outlined' InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleSubmit(handleTokenSearch)} onMouseDown={handleSubmit(handleTokenSearch)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }} {...register('tokenID')}/>
      </div>
      <Grid container spacing={1} style={{ marginTop: 12 }}>
        {collection.map(
          (token) =>
            token && (
              <Grid item key={token.staticData.asset.id} xl={3} md={4} sm={6} xs={12}>
                <TokenComponent {...token} />
              </Grid>
            )
        )}
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Placeholder style={{ width: '30%' }} />
        </div>
      )}
    </>
  );
};

export default CollectionPage;
