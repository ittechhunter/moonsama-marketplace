import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(5)
  },
  iconBlock: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: `${theme.spacing(4)}px 0`,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  icon: {
    height: 'auto',
    width: '55%',
    fill: theme.palette.primary.main,
    marginBottom: theme.spacing(3)
  }
}))