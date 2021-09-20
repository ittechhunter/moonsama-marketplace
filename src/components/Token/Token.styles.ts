import makeStyles from '@material-ui/core/styles/makeStyles';

import tokenBackgroundImage from '../../assets/images/token-bg.jpg';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: '4px',
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
    borderRadius: '4px',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    background: `url(${tokenBackgroundImage}) no-repeat center center`,
    backgroundSize: 'cover',
  },
  nameContainer: {
    // marginTop: 20,
    display: 'flex',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  stockContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: 12,
  },
  lastPriceContainer: {
    display: 'flex',
    justifyContent: 'normal',
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
    marginRight: theme.spacing(1),
  },
}));
