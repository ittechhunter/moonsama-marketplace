import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlitchText } from 'ui';
import { appStyles } from '../../app.styles';
import { collectionListStyles } from './collection-list.styles';
import {
  useRawCollectionsFromList,
  RawCollection,
} from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import {
  CollectionMeta,
  useFetchCollectionMeta,
} from 'hooks/useFetchCollectionMeta/useFetchCollectionMeta';
import { ExternalLink, Media } from 'components';
import { getExplorerLink, truncateHexString } from 'utils';
import { useActiveWeb3React } from 'hooks';
import { StringAssetType } from 'utils/subgraph';

export const CollectionListPage = () => {
  const rawCollections = useRawCollectionsFromList();
  const metas = useFetchCollectionMeta(rawCollections);

  //console.warn('HERE', { rawCollections, metas });

  const collections: RawCollection[] = rawCollections ?? [];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <GlitchText fontSize={48}>Featured collections</GlitchText>
      </div>

      <Grid container spacing={2} style={{ marginTop: 12 }}>
        {collections.map((collection: RawCollection, i) => {
          return CollectionListItem(collection, metas[i], i);
        })}
      </Grid>
    </>
  );
};

const CollectionListItem = (
  collection: RawCollection,
  meta: CollectionMeta | undefined,
  i: number
) => {
  const [isCollectionExpanded, setExpanded] = useState(false);

  const { chainId } = useActiveWeb3React();

  const handleExpandClick = () => {
    setExpanded(!isCollectionExpanded);
  };

  const { expand, expandOpen } = appStyles();
  const {
    mediaContainer,
    cardTitle,
    collectionName,
    collectionSymbol,
    collectionType,
    card,
    collectionDescription,
  } = collectionListStyles();

  //console.warn('META', { meta });

  const isErc20 = collection.type.valueOf() === StringAssetType.ERC20.valueOf();
  const subcollection = collection.subcollections

  return (
      <Grid
        item
        key={`${collection?.address ?? 'collection'}-${i}`}
        xl={3}
        md={4}
        sm={6}
        xs={12}
      >
        <Card className={card}>
          <Link
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            to={
              isErc20
                ? `/token/${collection.type}/${collection.address}/0`
                : !!subcollection ? `/subcollections/${collection.address}` : `/collection/${collection.type}/${collection.address}/0`
            }
          >
            <div className={mediaContainer}>
              <Media uri={meta?.image} />
            </div>
            {/*<CardMedia
              className={cardMediaImage}
              src={WHITE_SUSU}
              title={collection.display_name}
            />*/}
          </Link>
          <CardContent>
            <Typography
              className={cardTitle}
              variant="body2"
              color="textSecondary"
              component="div"
            >
              <div className={collectionName}>{collection.display_name}</div>
              <div className={collectionSymbol}>{collection.symbol}</div>
            </Typography>
            <div className={collectionType}>{collection.type}</div>
            {collection?.address && chainId && (
              <ExternalLink
                href={getExplorerLink(chainId, collection.address, 'address')}
              >
                {truncateHexString(collection.address)}↗
              </ExternalLink>
            )}
          </CardContent>

          <Collapse in={isCollectionExpanded} timeout="auto" unmountOnExit>
            <CardContent style={{ padding: '8px 16px' }}>
              <Typography paragraph className={collectionDescription}>
                {meta?.description}
              </Typography>
              {meta?.external_link && (
                <ExternalLink href={meta?.external_link}>
                  External site↗
                </ExternalLink>
              )}
            </CardContent>
          </Collapse>
          <CardActions disableSpacing style={{ maxHeight: 0 }}>
            <IconButton
              className={isCollectionExpanded ? expandOpen : expand}
              onClick={handleExpandClick}
              aria-expanded={isCollectionExpanded}
              aria-label="show more"
              style={{ marginTop: '-32px' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
  );
};
