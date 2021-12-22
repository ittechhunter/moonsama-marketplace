import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useClasses } from 'hooks';
import { ReactNode } from 'react';
import { styles } from './Header.styles';

export const Header = ({ children }: { children: ReactNode }) => {
  const { appBar } = useClasses(styles);
  return (
    <>
      <AppBar className={appBar} elevation={0}>
        <Toolbar>{children}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
