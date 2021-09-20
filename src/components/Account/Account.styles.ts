import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  button: {
    padding: '6px 16px',
    background: '#111',
    borderRadius: '0',

    [theme.breakpoints.down('sm')]: {
      background: 'none',
      position: 'absolute',
      right: 0,
    },
  },
}));
