import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
  },
}));
