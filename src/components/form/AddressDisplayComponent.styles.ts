import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  copyButton: {
    minWidth: 25,
    marginLeft: 7.5,
    padding: '0 5px',
    border: '1px solid ',
    borderColor: theme.palette.grey[900],
    borderRadius: 5,
  },
}));
