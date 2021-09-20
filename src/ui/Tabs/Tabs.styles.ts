import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  tab: {
    minWidth: 'unset',
    minHeight: 'unset',
    color: 'white',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    height: 28,
    marginRight: 8,
    transition: 'all .2s',
    background: 'none',
    padding: '24px',
    opacity: 1,
  },
  selected: {
    color: '#fff',
    background: '#111',
  },
  tabsStyles: {
    minHeight: 'unset',
    borderRadius: '4px',
    padding: 0,
  },
}));
