import MaterialButton, { ButtonProps } from '@material-ui/core/Button';

export const Button = ({ children, ...props }: ButtonProps) => {
  return <MaterialButton {...props}>{children}</MaterialButton>;
};
