import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  placeholderContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    margin: '20 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 12,
    textAlign: 'center',
  },
  tabsContainer: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  tabs: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  select: {
    width: '200px',
    padding: '0',
    textAlign: 'left',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#505050 !important',
      borderRadius: 0,
    },
    '& .MuiSvgIcon-root': {
      color: '#505050',
    },
  },
  selectLabel: {
    fontFamily: 'Space Mono, monospace !important',
    color: '#c5c5c5 !important',
  },
  dropDown: {
    backgroundColor: '#111 !important',
    color: '#fff !important',
  },
  filterControls: {},
}));
