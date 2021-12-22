import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { theme } from 'theme/Theme';

export const StyledNav = styled(NavLink)`
  color: ${theme.palette.text.secondary};
  font-size: ${theme.typography.fontSize};
  transition: color 0.2s;
  font-weight: 600;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;
