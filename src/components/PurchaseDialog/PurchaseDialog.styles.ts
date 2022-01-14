import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
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
  columGap : {
    flex: '1 0 15px'
  }
});
