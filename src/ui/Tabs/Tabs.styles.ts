import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  tab: {
    minWidth: 'unset',
    minHeight: 'unset',
    color: 'white',
    borderRadius: '14px',
    height: 28,
    marginRight: 8,
    transition: 'all .2s',
    fontWeight: 600,
    background: 'none',
    opacity: 1,
  },
  selected: {
    color: 'black',
    background: 'white',
    border: '1px solid white',
  },
  tabsStyles: {
    minHeight: 'unset',
    boxShadow: `inset 0 0 0 2px ${theme.palette.text.secondary}`,
    borderRadius: 20,
    padding: 6,
  },
}));
