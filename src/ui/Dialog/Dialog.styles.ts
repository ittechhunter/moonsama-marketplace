import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
  },
  paperStyles: {
    background: '#111',
    borderRadius: '4px',
  },
  dialogTitle: {
    fontSize: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentWrapper: {
    background: '#0a0a0a',
  },
  closeButton: {
    color: theme.palette.text.primary,
    fontSize: 32,
  },
}));
