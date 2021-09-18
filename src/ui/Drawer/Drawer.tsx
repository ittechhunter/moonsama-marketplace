import SwipeableDrawer, { SwipeableDrawerProps } from '@material-ui/core/SwipeableDrawer';

export const Drawer = ({ children, ...props }: SwipeableDrawerProps) => {
  return <SwipeableDrawer {...props}>{children}</SwipeableDrawer>
}