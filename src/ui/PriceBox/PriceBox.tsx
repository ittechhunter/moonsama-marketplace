import { ReactNode } from 'react';
import { useStyles } from './PriceBox.styles';

export const PriceBox = ({
  children,
  variant = 'primary',
  size = 'medium',
  margin = true,
  color
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  margin?: boolean;
  color?: string
}) => {
  const { priceBox } = useStyles({ variant, size, margin, color });
  return (
    <div className={priceBox}>
      <div>{children}</div>
    </div>
  );
};
