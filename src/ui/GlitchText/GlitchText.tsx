import { TypographyProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';
import { StyledGlitch } from './GlitchText.styles';

export const GlitchText = ({
  children,
  className,
  variant,
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
} & TypographyProps) => {
  return (
    <StyledGlitch className={className} {...props} variant={variant}>
      <span aria-hidden="true">{children}</span>
      {children}
      <span aria-hidden="true">{children}</span>
    </StyledGlitch>
  );
};
