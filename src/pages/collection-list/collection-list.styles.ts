import makeStyles from '@material-ui/core/styles/makeStyles';

import tokenBackgroundImage from '../../assets/images/token-bg.jpg';

export const collectionListStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 20,
  },
  mediaContainer: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    minHeight: 330,
    display: 'flex',
    maxHeight: 330,
    maxWidth: 330,
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    '& > img': {
      background: `url(${tokenBackgroundImage}) no-repeat center center`,
      backgroundSize: 'cover',
    },
  },
  media: {},
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  collectionName: {
    color: theme.palette.text.primary,
  },
  collectionSymbol: {
    color: theme.palette.text.secondary,
  },
  collectionType: {
    color: theme.palette.text.primary,
  },
}));
