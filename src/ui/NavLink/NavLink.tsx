import { ReactNode } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';
import { useStyles } from './NavLink.styles';
import { Typography } from '@material-ui/core';

export const NavLink = ({
  href,
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  const {
    location: { pathname },
  } = useHistory();
  const isActive = pathname === href;
  const { link } = useStyles({ isActive });
  return (
    <Link to={href}>
      <MaterialLink
        component={Typography}
        className={`${link} ${className}`}
        color="inherit"
        underline="none"
      >
        {children}
      </MaterialLink>
    </Link>
  );
};
