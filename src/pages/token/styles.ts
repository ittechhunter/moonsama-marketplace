import makeStyles from '@material-ui/core/styles/makeStyles';

import { fontWeight } from 'theme/typography';

import tokenBackgroundImage from '../../assets/images/token-bg.jpg';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '60%',
    maxHeight: '80%',
    padding: 0,
    [theme.breakpoints.down('md')]: {
      maxWidth: 'unset',
      padding: theme.spacing(1),
    },
  },
  image: {
    width: '70%',
    height: 'auto',
    borderRadius: '4px',
    objectFit: 'contain',
    background: `url(${tokenBackgroundImage}) no-repeat center center`,
    backgroundSize: 'cover',
  },
  name: {
    marginBottom: theme.spacing(1),
    fontWeight: fontWeight.bolder,
    lineHeight: 1,
    letterSpacing: '-.02em',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  card: {
    background: 'none',
    borderRadius: '4px',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(4),
  },
  avatarContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
  tabsContainer: {
    marginTop: theme.spacing(8),
    width: '100%',
  },
  tabs: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bidContainer: {
    width: `calc(100% - ${theme.spacing(6)}px)`,
    marginLeft: theme.spacing(1),
  },
  bidder: {
    width: '40%',
    marginLeft: theme.spacing(0.25),
  },
  bidText: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
    marginRight: theme.spacing(1),
    marginTop: -theme.spacing(1),
  },
  bidCurrency: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
    color: theme.palette.text.secondary,
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  externals: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: theme.spacing(4),
    flexDirection: 'column',
    gap: 8
  },
  subHeader: {
    fontSize: 22,
    color: theme.palette.common.white,
    marginBottom: '1rem',
  },
  subItemTitleCell: {
    minWidth: 170,
  },
  assetActionsBidTokenAmount: {
    color: 'white',
    fontWeight: 600,
  },
  assetActionsBidCurrency: {
    marginLeft: '0.4rem',
    color: theme.palette.grey[600],
  },
  transferButton: {

  },
  newSellButton: {
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
      color: 'black'
    }
  },
  tradeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  tradeRow: {
    display: 'flex',
    alignItems: 'center'
  },
  copyAddressButton: {
    marginTop: -27
  }
}));
