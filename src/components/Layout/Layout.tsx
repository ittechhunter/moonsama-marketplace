import { useCallback, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useMediaQuery } from 'beautiful-react-hooks'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';


import { Header, NavLink, Drawer } from 'ui';

import { LayoutProps } from './Layout.types';
import { useStyles } from './Layout.styles';

import WhiteLogo from 'assets/images/gsw.png';
import { Account } from 'components';
import { HeaderBalance } from 'components/HeaderBalance/HeaderBalance';
import { MAX_WIDTH_TO_SHOW_NAVIGATION } from '../../constants';



export const Layout = ({ children }: LayoutProps) => {
  const { logo, nav, navItem, buttonContainer, navItemDrawer } = useStyles();
  const showRegularMenu = useMediaQuery(`(max-width: ${MAX_WIDTH_TO_SHOW_NAVIGATION}px)`)
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)

  return (
    <>
      <Header>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item className={nav}>
              {showRegularMenu && <IconButton onClick={() => setIsDrawerOpened(true)}><MenuIcon /></IconButton>}
              <NavLink href="/" className={navItem}>
                <div className={logo}>
                  <img src={WhiteLogo} alt="" />
                </div>
              </NavLink>
              {!showRegularMenu ? (
                <Box style={{ display: 'flex ' }}>
                  <NavLink href="/" className={navItem}>
                    Welcome
                  </NavLink>
                  <NavLink href="/freshorders" className={navItem}>
                    Latest orders
                  </NavLink>
                  <NavLink href="/freshtrades" className={navItem}>
                    Latest trades
                  </NavLink>
                  <NavLink href="/yourorders" className={navItem}>
                    Your orders
                  </NavLink>

                  {/*<NavLink href="/explore" className={navItem}>
                  Explore
                </NavLink>*/}
                </Box>
              ) : (
                <Drawer open={isDrawerOpened} onClose={() => setIsDrawerOpened(false)} onOpen={() => setIsDrawerOpened(true)}>
                  <Box>
                    <NavLink href="/" className={navItemDrawer}>
                      Welcome
                    </NavLink>
                    <NavLink href="/freshorders" className={navItemDrawer}>
                      Latest orders
                    </NavLink>
                    <NavLink href="/freshtrades" className={navItemDrawer}>
                      Latest trades
                    </NavLink>
                    <NavLink href="/yourorders" className={navItemDrawer}>
                      Your orders
                    </NavLink>
                  </Box>
                </Drawer>
              )}
            </Grid>
            <Grid item xl={3} className={buttonContainer}>
              <HeaderBalance />
              <Account />
            </Grid>
          </Grid>
        </Container>
      </Header>
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};
