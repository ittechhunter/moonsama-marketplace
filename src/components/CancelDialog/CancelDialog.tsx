import { useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BigNumber } from '@ethersproject/bignumber';

import { useActiveWeb3React, useCancelDialog } from '../../hooks';
import { SuccessIcon } from 'icons';
import { Dialog, Button } from 'ui';
import { useStyles } from './CancelDialog.styles';

import { ChainId } from '../../constants';
import { getExplorerLink, getRandomInt } from 'utils';
import { useSubmittedCancelTx } from 'state/transactions/hooks';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import {
  CancelOrderCallbackState,
  useCancelOrderCallback,
} from 'hooks/marketplace/useCancelOrderCallback';
import { AddressDisplayComponent } from 'components/form/AddressDisplayComponent';

export const CancelDialog = () => {
  const [finalTxSubmitted, setFinalTxSubmitted] = useState<boolean>(false);
  const { isCancelDialogOpen, setCancelDialogOpen, cancelData } =
    useCancelDialog();
  const [orderLoaded, setOrderLoaded] = useState<boolean>(false);

  const {
    dialogContainer,
    loadingContainer,
    button,
    divider,
    infoContainer,
    successContainer,
    successIcon,
    nakedInput,
  } = useStyles();

  const { chainId } = useActiveWeb3React();

  const handleClose = () => {
    setCancelDialogOpen(false);
    setFinalTxSubmitted(false);
  };

  if (!orderLoaded && cancelData && cancelData?.orderHash) {
    setOrderLoaded(true);
  }

  const { state: cancelOrderState, callback: cancelOrderCallback } =
    useCancelOrderCallback(cancelData?.orderHash);

  const { cancelSubmitted, cancelTx } = useSubmittedCancelTx(
    cancelData?.orderHash
  );

  const renderBody = () => {
    if (!orderLoaded) {
      return (
        <div className={loadingContainer}>
          <CircularProgress />
          <div>
            <Typography>Loading asset details</Typography>
            <Typography color="textSecondary" variant="h5">
              Should be a jiffy
            </Typography>
          </div>
        </div>
      );
    }

    if (finalTxSubmitted && !cancelSubmitted) {
      return (
        <>
          <div className={loadingContainer}>
            <CircularProgress />
            <div>
              <Typography>Placing cancel transaction...</Typography>
              <Typography color="textSecondary" variant="h5">
                Check your wallet for potential action
              </Typography>
            </div>
          </div>
        </>
      );
    }
    if (finalTxSubmitted && cancelSubmitted) {
      return (
        <div className={successContainer}>
          <SuccessIcon className={successIcon} />
          <Typography>Cancel submited</Typography>
          <Typography color="primary">{cancelData?.orderHash}</Typography>

          {cancelTx && (
            <ExternalLink
              href={getExplorerLink(
                chainId ?? ChainId.MOONRIVER,
                cancelTx.hash,
                'transaction'
              )}
            >
              {cancelTx.hash}
            </ExternalLink>
          )}
          <Button
            className={button}
            onClick={handleClose}
            variant="outlined"
            color="primary"
          >
            Close
          </Button>
        </div>
      );
    }
    return (
      <>
        <div className={infoContainer}>
          <Typography>Order to cancel</Typography>
          <AddressDisplayComponent charsShown={10} dontShowLink={true}>
            {cancelData?.orderHash}
          </AddressDisplayComponent>
        </div>

        <Divider variant="fullWidth" className={divider} />

        <Button
          onClick={() => {
            cancelOrderCallback?.();
            setFinalTxSubmitted(true);
          }}
          className={button}
          variant="contained"
          color="primary"
          disabled={cancelOrderState !== CancelOrderCallbackState.VALID}
        >
          Cancel order
        </Button>
        <Button
          className={button}
          onClick={handleClose}
          variant="outlined"
          color="primary"
        >
          Back
        </Button>
      </>
    );
  };
  return (
    <Dialog
      open={isCancelDialogOpen}
      onClose={handleClose}
      title={'Cancel order'}
    >
      <div className={dialogContainer}>{renderBody()}</div>
    </Dialog>
  );
};
