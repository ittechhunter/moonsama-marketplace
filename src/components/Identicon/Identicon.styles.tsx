import { Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles<Theme>((theme) => ({
  identiconContainer: {
    height: 'auto',
    width: '100%',
    borderRadius: '1.125rem',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
