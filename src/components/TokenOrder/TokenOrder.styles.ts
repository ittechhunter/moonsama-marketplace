import makeStyles from '@material-ui/core/styles/makeStyles';

import tokenBackgroundImage from '../../assets/images/token-bg.jpg';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    minHeight: 330,
    display: 'flex',
    maxHeight: 330,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    background: `url(${tokenBackgroundImage}) no-repeat center center`,
    backgroundSize: 'cover',
  },
  nameContainer: {
    marginTop: 20,
    display: 'flex',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  stockContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  lastPriceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  bidContainer: {
    display: 'flex',
    marginTop: 12,
  },
  tokenName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: 14,
  },
  mr: {
    marginRight: theme.spacing(1)
  }
}));
