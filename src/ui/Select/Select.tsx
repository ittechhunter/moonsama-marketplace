import Sel, { SelectProps } from '@material-ui/core/Select';

export const Select = ({ children, ...props }: SelectProps) => {
  return <>
    <Sel {...props}>{children}</Sel>
  </>
};
