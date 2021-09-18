import { ReactNode } from 'react';
import { useStyles } from './GlitchText.styles';

export const GlitchText = ({
  children,
  fontSize,
  className,
}: {
  children: ReactNode;
  fontSize?: number;
  className?: string;
}) => {
  const { glitch } = useStyles({ fontSize });
  return (
    <h1 className={`${glitch} ${className}`}>
      <span aria-hidden="true">{children}</span>
      {children}
      <span aria-hidden="true">{children}</span>
    </h1>
  );
};
