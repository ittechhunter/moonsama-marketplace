import Grid from '@material-ui/core/Grid';
import { TokenOrder } from '../../components/TokenOrder/TokenOrder';
import {
  Button,
  GlitchText,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tabs,
  Drawer,
} from 'ui';
import React, { useCallback, useEffect, useState } from 'react';
import { Order } from 'hooks/marketplace/types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useStyles } from './styles';
import {
  useLatestBuyOrdersForTokenWithStaticCallback,
  useLatestSellOrdersForTokenWithStaticCallback,
} from 'hooks/useLatestOrdersWithStaticCallback/useLatestOrdersWithStaticCallback';
import {
  inferOrderTYpe,
  OrderType,
} from '../../utils/subgraph';
import { useActiveWeb3React } from '../../hooks';
import { useWhitelistedAddresses } from 'hooks/useWhitelistedAddresses/useWhitelistedAddresses';
import { Chip, Stack } from '@mui/material';
import { useRawCollectionsFromList } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const PAGE_SIZE = 10;

const geTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableCell>Item</TableCell>
        <TableCell>Unit Price</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>From</TableCell>
        <TableCell>Strategy</TableCell>
        <TableCell>Expiration</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHeader>
  );
};

const FreshOrdersPage = () => {
  const [buyOrders, setBuyOrders] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      order: Order;
    }[]
  >([]);

  const [sellOrders, setSellOrders] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      order: Order;
    }[]
  >([]);

  const collections = useRawCollectionsFromList()

  const [selectedIndex, setSelectedIndex] = useState<number>(collections.findIndex(x => x.display_name = 'Moonsama') ?? 0)
  const [take, setTake] = useState<number>(0);
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const {
    placeholderContainer,
    container,
    pageContainer,
    tabsContainer,
    tabs,
    select,
    selectLabel,
    dropDown,
    filterControls,
    filterChip
  } = useStyles();
  const whitelist = useWhitelistedAddresses(); // REMOVEME later

  const { chainId } = useActiveWeb3React();
  const getPaginatedSellOrders = useLatestSellOrdersForTokenWithStaticCallback();
  const getPaginatedBuyOrders = useLatestBuyOrdersForTokenWithStaticCallback();

  const selectedTokenAddress = collections[selectedIndex]?.address?.toLowerCase()

  const handleSelection = (i: number) => {
    if (i !== selectedIndex) {
      setBuyOrders([])
      setSellOrders([])
      setSelectedIndex(i)
      setTake(0)
      setPaginationEnded(false);
    }
  }

  const handleScrollToBottom = useCallback(() => {
    setTake((state) => (state += PAGE_SIZE));
  }, []);

  useBottomScrollListener(handleScrollToBottom, { offset: 400 });

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);

      let buyData = await getPaginatedBuyOrders(selectedTokenAddress, PAGE_SIZE, take);
      let sellData = await getPaginatedSellOrders(selectedTokenAddress, PAGE_SIZE, take);

      buyData = buyData.filter((x) =>
        whitelist.includes(x.order.buyAsset.assetAddress.toLowerCase())
      ); // REMOVEME later
      sellData = sellData.filter((x) =>
        whitelist.includes(x.order.sellAsset.assetAddress.toLowerCase())
      ); // REMOVEME later

      setPageLoading(false);

      const isEnd =
        buyData.some(({ meta }) => !meta) || sellData.some(({ meta }) => !meta);

      if (isEnd) {
        const buyPieces = buyData.filter(({ meta }) => !!meta);
        const sellPieces = sellData.filter(({ meta }) => !!meta);

        setPaginationEnded(true);

        setSellOrders((state) => state.concat(sellPieces));
        setBuyOrders((state) => state.concat(buyPieces));

        return;
      }

      setSellOrders((state) => state.concat(sellData));
      setBuyOrders((state) => state.concat(buyData));
    };
    if (!paginationEnded) {
      getCollectionById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [take, paginationEnded, selectedTokenAddress]);

  const getTableBody = (
    filteredCollection:
      | {
          meta: TokenMeta | undefined;
          staticData: StaticTokenData;
          order: Order;
        }[]
      | undefined
      | null
  ) => {
    return (
      <TableBody>
        {filteredCollection && filteredCollection.length > 0 ? (
          filteredCollection.map(
            (token, i) => token && <TokenOrder {...token} />
          )
        ) : (
          <TableRow>
            <TableCell style={{ textAlign: 'center' }} colSpan={7}>
              No records available...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  return (
    <>
      <div className={container}>
        <GlitchText fontSize={48}>Latest offers</GlitchText>
      </div>

      <Drawer
        anchor="left"
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        onOpen={() => setIsDrawerOpened(true)}
      >
        Filters
      </Drawer>

      <Grid container className={pageContainer} justifyContent="center">
        <Stack flexDirection="row">
          {collections.map((collection, i) => {
              return <Chip
                key={`${collection.address}-${i}`}
                label={collection.display_name}
                variant="outlined"
                onClick={() => handleSelection(i)}
                className={`${filterChip}${selectedIndex === i ? ' selected': ''}`} />
            })}
        </Stack>
        <Tabs
          containerClassName={tabsContainer}
          tabsClassName={tabs}
          tabs={[
            {
              label: 'Sell Offers',
              view: (
                <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                  {geTableHeader()}
                  {getTableBody(sellOrders)}
                </Table>
              ),
            },
            {
              label: 'Buy Offers',
              view: (
                <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                  {geTableHeader()}
                  {getTableBody(buyOrders)}
                </Table>
              ),
            },
          ]}
        />
        <div style={{ marginTop: 40, width: '100%' }} />
      </Grid>

      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default FreshOrdersPage;
