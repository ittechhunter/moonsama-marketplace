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
import {useEffect, useState} from 'react';

export const MintResourceApproveItem = ({assetAddress, assetId, assetType, amount, assetName}: AllowanceQuery & { amount?: string | BigNumber, assetName?: string }) => {
  const [approvalState, approveCallback] = useApproveCallback({
    assetAddress,
    assetId,
    assetType,
    amountToApprove: amount,
  });

  const {
    approveItemContainer,
    transferButton
  } = useClasses(styles);

  return (
    <div className={approveItemContainer}>
      <Typography color="textSecondary" variant="subtitle1">
        {`${amount} ${assetName}`}
      </Typography>
      {approvalState != ApprovalState.APPROVED ? (
      <Button
        onClick={() => {
          approveCallback();
        }}
        startIcon={<MoneyIcon />}
        variant="contained"
        color="primary"
        className={transferButton}
        disabled={approvalState === ApprovalState.PENDING}
      >
        Approve
      </Button>) :
      "Approved"
      }
    </div>
  );

}