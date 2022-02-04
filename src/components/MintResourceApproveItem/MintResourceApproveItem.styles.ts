import { Theme } from '@mui/material';
import { fontWeight } from 'theme/typography';

export const styles = (theme: Theme) => ({
  approveItemContainer: {
    display: 'flex',
    justifyContent: 'between-center',
  },
  transferButton: {
    '&:hover': {
      backgroundColor: '#dcdcdc',
      color: 'black',
    },
  },
});
