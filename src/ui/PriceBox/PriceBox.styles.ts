import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  priceBox: ({
    variant,
    size,
    margin,
    color
  }: {
    variant: 'primary' | 'secondary';
    size: 'small' | 'medium';
    margin: boolean;
    color?: string
  }) => ({
    borderWidth: theme.spacing(0.25),
    borderStyle: 'solid',
    borderColor: color ? color
      : variant === 'primary'
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
    borderRadius: theme.spacing(0.5),
    color: color ? color
      : variant === 'primary'
          ? theme.palette.primary.main
          : theme.palette.text.primary,
    padding: `0 ${theme.spacing(1)}px`,
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '-.01em',
    fontSize: size === 'medium' ? theme.spacing(2) : theme.spacing(1.5),
    marginRight: margin ? theme.spacing(1) : 0,
    display: 'flex',
    alignItems: 'center',
  }),
}));
