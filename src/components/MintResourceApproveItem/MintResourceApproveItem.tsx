import { Typography, Button } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import {
  ApprovalState,
  useApproveCallback,
} from 'hooks/useApproveCallback/useApproveCallback';
import { BigNumber } from '@ethersproject/bignumber';
import { AllowanceQuery } from 'hooks/useApproveCallback/useApproveCallback.types';
import {styles} from './MintResourceApproveItem.styles'
import { useClasses } from 'hooks';

export const MintResourceApproveItem = ({assetAddress, assetId, assetType, amountToApprove, assetName}: AllowanceQuery & { amountToApprove?: string | BigNumber, assetName?: string }) => {
  
  const [approvalState, approveCallback] = useApproveCallback({
    assetAddress,
    assetId,
    assetType,
    amountToApprove,
  });

  const {
    approveItemContainer,
    transferButton
  } = useClasses(styles);

  return (
    <div className={approveItemContainer}>
      <Typography color="textSecondary" variant="subtitle1">
        {`${amountToApprove} ${assetName}`}
      </Typography>
      <Button
        onClick={() => {
          approveCallback();
        }}
        startIcon={<MoneyIcon />}
        variant="contained"
        color="primary"
        className={transferButton}
      >
        Approve
      </Button>
    </div>
  );

}