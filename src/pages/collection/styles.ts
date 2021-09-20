import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  placeholderContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    margin: '20 0'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 12,
    textAlign: 'center'
  },
}))