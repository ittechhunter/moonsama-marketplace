import IconButton from '@material-ui/core/IconButton';
import DialogUI, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './Dialog.styles';

export const Dialog = ({ title, children, onClose, ...props }: DialogProps) => {
  const { dialogContainer, closeButton, closeButtonContainer } = useStyles();
  const handleClose = () => {
    onClose && onClose({}, 'escapeKeyDown');
  };
  return (
    <DialogUI onClose={onClose} {...props}>
      <DialogTitle className={dialogContainer} disableTypography>
        <Typography variant="h3">{title}</Typography>
        {onClose ? (
          <div className={closeButtonContainer}>
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
    </DialogUI>
  );
};
