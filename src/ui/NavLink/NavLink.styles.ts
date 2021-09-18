import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  link: {
    color: ({ isActive }: { isActive: boolean }) =>
      isActive ? theme.palette.text.primary : theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
    fontSize: theme.typography.fontSize,
    transition: 'color .2s',
    fontWeight: 600,
  },
}));
