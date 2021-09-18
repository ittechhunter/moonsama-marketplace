import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    display: 'flex',
    padding: theme.spacing(4),
    flexDirection: 'column',
    minWidth: 500,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successIcon: {
    width: '30%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
}));
