import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  priceBox: ({
    variant,
    size,
    margin,
    color,
  }: {
    variant: 'primary' | 'secondary';
    size: 'small' | 'medium';
    margin: boolean;
    color?: string;
  }) => ({
    color: color
      ? color
      : variant === 'primary'
          ? '#b90e0e'
          : '#156b00',
    padding: 0,
    textTransform: 'uppercase',
    letterSpacing: '-.01em',
    fontSize: size === 'medium' ? theme.spacing(2) : '16px',
    marginRight: margin ? theme.spacing(1) : 0,
    marginTop: '6px',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    height: ''
  }),
}));
