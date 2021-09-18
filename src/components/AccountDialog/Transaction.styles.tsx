import { Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

type Props = {
  success?: boolean;
  pending?: boolean;
};

export const useStyles = makeStyles<Theme, Props>((theme) => ({
  dialogContainer: {
    display: 'flex',
    padding: 32,
    flexDirection: 'column',
  },
  button: {
    marginTop: '8px',
  },
  row: {
    marginTop: '20px',
  },
  transactionState: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none !important',
    borderRadius: '0.5rem',
    padding: '0.25rem 0rem',
    fontWeight: 500,
    fontSize: '0.825rem',
    color: theme.palette.text.primary,
  },
  iconWrapper: {
    color: ({ pending, success }) =>
      pending
        ? theme.palette.text.primary
        : success
        ? theme.palette.success.main
        : theme.palette.error.main,
  },
}));
