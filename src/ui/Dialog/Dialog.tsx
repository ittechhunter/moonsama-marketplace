import IconButton from '@material-ui/core/IconButton';
import DialogUI, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './Dialog.styles';

export const Dialog = ({ title, children, onClose, ...props }: DialogProps) => {
  const { dialogContainer, dialogTitle, paperStyles, closeButton } = useStyles();
  const handleClose = () => {
    onClose && onClose({}, 'escapeKeyDown');
  };
  return (
    <DialogUI className={dialogContainer} PaperProps={{
      className: paperStyles,
    }} onClose={onClose} {...props}>
      <div>
      <DialogTitle className={dialogTitle} disableTypography>
        <Typography variant="h4">{title}</Typography>
        {onClose ? (
          <div>
            <IconButton
              className={closeButton}
              aria-label="close"
              onClick={handleClose}
            >
              &times;
            </IconButton>
          </div>
        ) : null}
      </DialogTitle>

      {children}
      </div>
    </DialogUI>
  );
};
