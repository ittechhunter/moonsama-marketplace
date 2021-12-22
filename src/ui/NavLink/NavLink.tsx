import { ReactNode } from 'react';
import { theme } from 'theme/Theme';
import { StyledNav } from './NavLink.styles';

export const NavLink = ({
  href,
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <StyledNav
      theme={theme}
      to={href}
      activeStyle={{ color: theme.palette.text.primary }}
      className={className}
      {...props}
    >
      {children}
    </StyledNav>
  );
};
