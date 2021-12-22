import { TypographyProps } from '@mui/system';
import { ReactNode } from 'react';
import { StyledGlitch } from './GlitchText.styles';

export const GlitchText = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & TypographyProps) => {
  return (
    <StyledGlitch className={className} {...props}>
      <span aria-hidden="true">{children}</span>
      {children}
      <span aria-hidden="true">{children}</span>
    </StyledGlitch>
  );
};
