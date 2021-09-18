import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButtonContainer: {
    border: `${theme.palette.text.disabled} 1px solid`,
    borderRadius: '50%',
    width: 42,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'border-color .2s',
    '&:hover': {
      borderColor: theme.palette.text.primary,
      transition: 'border-color .2s',
    },
  },
  closeButton: {
    color: theme.palette.text.primary,
    fontSize: 36,
  },
}));
