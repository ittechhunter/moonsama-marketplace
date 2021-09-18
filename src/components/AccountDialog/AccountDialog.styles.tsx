import { Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles<Theme>((theme) => ({
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
    display: 'flex',
    flexDirection: 'row',
  },
  lowerSection: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '1.5rem',
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: '20px',
    borderNottomRightRadius: '20px',
  },
  walletName: {
    width: 'initial',
    fontSize: '0.825rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  iconWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    '& > img': {},
    span: {
      height: '16px',
      width: '16px',
    },
  },
  flexCoumnNoWrap: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  linkStyledButton: {
    border: 'none',
    textDecoration: 'none',
    background: 'none',
    cursor: 'pointer',
    color: theme.palette.text.primary,
    fontWeight: 500,
    ':hover': {
      textDecoration: 'underline',
    },
    ':focus': {
      outline: 'none',
      textDecoration: 'underline',
    },
    ':active': {
      textDecoration: 'none',
    },
  },
  autoRow: {
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
}));
