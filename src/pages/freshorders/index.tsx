import Grid from '@material-ui/core/Grid';
import { TokenOrder } from '../../components/TokenOrder/TokenOrder';
import { GlitchText, Placeholder } from 'ui';
import { useCallback, useEffect, useState } from 'react';
import { Order } from 'hooks/marketplace/types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useStyles } from './styles';
import { useLatestOrdersWithStaticCallback } from 'hooks/useLatestOrdersWithStaticCallback/useLatestOrdersWithStaticCallback';

const PAGE_SIZE = 10;

const FreshOrdersPage = () => {
  const [collection, setCollection] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      order: Order;
    }[]
  >([]);
  const [take, setTake] = useState<number>(0);
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { placeholderContainer, container } = useStyles();

  const getPaginatedItems = useLatestOrdersWithStaticCallback();

  const handleScrollToBottom = useCallback(() => {
    setTake((state) => (state += PAGE_SIZE));
  }, []);

  useBottomScrollListener(handleScrollToBottom, { offset: 400 });

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);
      const data = await getPaginatedItems(PAGE_SIZE, take);
      setPageLoading(false);

      console.log('latest', data);
      const isEnd = data.some(({ meta }) => !meta);

      //console.log('IS END', {paginationEnded, isEnd, pieces, data})

      //console.log('FRESH', {data, PAGE_SIZE, take, isEnd})

      if (isEnd) {
        const pieces = data.filter(({ meta }) => !!meta);
        setPaginationEnded(true);
        setCollection((state) => state.concat(pieces));
        return;
      }
      setCollection((state) => state.concat(data));
    };
    if (!paginationEnded) {
      getCollectionById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [take, paginationEnded]);

  return (
    <>
      <div className={container}>
        <GlitchText fontSize={48}>Latest orders</GlitchText>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      ></div>
      <Grid container spacing={1} style={{ marginTop: 12 }}>
        {collection
          .map(
            (token, i) =>
              token && (
                <Grid
                  item
                  key={`${token.staticData.asset.id}-${i}`}
                  xl={3}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TokenOrder {...token} />
                </Grid>
              )
          )
          .filter((x) => !!x)}
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Placeholder style={{ width: '30%' }} />
        </div>
      )}
    </>
  );
};

export default FreshOrdersPage;
