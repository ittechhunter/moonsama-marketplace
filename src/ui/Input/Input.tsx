import TextField, { TextFieldProps } from '@material-ui/core/TextField';

export const Input = (props: TextFieldProps) => {
  return <TextField variant="outlined" placeholder="Search token" {...props} />;
};
