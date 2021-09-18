import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(1),
    height: 'auto',
    '& > img': {
      maxHeight: '48px',
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
  },
  navItemDrawer: {
    margin: '20px',
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
