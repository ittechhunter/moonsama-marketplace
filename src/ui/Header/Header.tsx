import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { useStyles } from './Header.styles';
import { ReactNode } from 'react';

export const Header = ({ children }: { children: ReactNode }) => {
  const { appBar } = useStyles();
  return (
    <>
      <AppBar className={appBar} elevation={0}>
        <Toolbar>{children}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
