import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  copyButton: {
    minWidth: 20,
    fontSize: '13px',
    marginLeft: 7.5,
    padding: '0 5px',
    border: '1px solid ',
    borderColor: theme.palette.grey[900],
    borderRadius: 0,
    '& path': {
      color: '#d2023e',
    }
  },
}));
