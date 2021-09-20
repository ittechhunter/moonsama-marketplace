import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(1),
    width: 180,
    height: 'auto',
    '& > img': {
      maxWidth: '100%',
      marginBottom: '-5px',
    },
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    margin: '0 20px',

    'a': {
      textDecoration: 'none !important',
    },
  },
  navItemDrawer: {
    margin: '20px',
    textDecoration: 'none !important',
    '> a': {
      textDecoration: 'none !important',
    },
  },
  inputContainer: {
    width: theme.spacing(32),
  },
  buttonContainer: {
    marginLeft: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
  },
}));
