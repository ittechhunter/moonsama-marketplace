import { Theme } from '@mui/material';
import { fontWeight } from 'theme/typography';

export const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    padding: theme.spacing(0.1),
    borderRadius: 0,
  },
  imageContainer: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0,
    justifyContent: 'center',
  },
  dialogContainer: {
    display: 'flex',
    padding: theme.spacing(4),
    flexDirection: 'column',
    minWidth: 500,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    background: '#111',
    backgroundSize: 'cover',
  },
  mr: {
    marginRight: theme.spacing(0.5),
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(0.5),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: theme.spacing(4),
    flexDirection: 'column',
    gap: 16,
  },
  name: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: fontWeight.bolder,
    lineHeight: 1,
    letterSpacing: '-.02em',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },  
  newSellButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
  transferButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
});
