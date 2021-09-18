import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  placeholder: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '40%',
    height: 'auto',
    animation: '$rotation 1s infinite linear',
  },
  '@keyframes rotation': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));
