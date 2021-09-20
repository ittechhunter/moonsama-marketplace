import makeStyles from '@material-ui/core/styles/makeStyles';

export const collectionListStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 4,
  },
  mediaContainer: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    minHeight: 300,
    display: 'flex',
    maxHeight: 300,
    maxWidth: 330,
    alignItems: 'center',
    borderRadius: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    '& > img': {
      background: '#111',
      backgroundSize: 'cover',
      height: '100%',
      width: '100%',
    },
  },
  media: {},
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  collectionName: {
    color: theme.palette.text.primary,
  },
  collectionSymbol: {
    color: theme.palette.text.secondary,
  },
  collectionType: {
    color: theme.palette.text.primary,
  },
  collectionDescription: {
    fontSize: '12px',
  }
}));
