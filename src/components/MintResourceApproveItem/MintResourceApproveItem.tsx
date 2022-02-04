import { Typography, Button } from '@mui/material';
import {
  ApprovalState,
  useApproveCallback,
} from 'hooks/useApproveCallback/useApproveCallback';
import { BigNumber } from '@ethersproject/bignumber';
import { AllowanceQuery } from 'hooks/useApproveCallback/useApproveCallback.types';
import {styles} from './MintResourceApproveItem.styles'
import { useActiveWeb3React, useClasses } from 'hooks';
import {useEffect, useState} from 'react';
import { WORKBENCH_ADDRESSES, ChainId } from '../../constants';

export const MintResourceApproveItem = ({assetAddress, assetId, assetType, amount, assetName}: AllowanceQuery & { amount?: string | BigNumber, assetName?: string }) => {
  const {chainId} = useActiveWeb3React()
  
  const [approvalState, approveCallback] = useApproveCallback({
    assetAddress,
    assetId,
    assetType,
    amountToApprove: amount,
    operator: WORKBENCH_ADDRESSES[chainId ?? ChainId.MOONRIVER]
  });
  const [approvalSubmitted, setApprovalSubmitted] = useState(false)

  useEffect(() => {
    console.log('approvalState', approvalState)
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState, approvalSubmitted]);

  const showApproveFlow =
    approvalState === ApprovalState.NOT_APPROVED

  const pending =
    approvalState === ApprovalState.PENDING

  const {
    approveItemContainer,
    transferButton
  } = useClasses(styles);

  console.log(approvalState, )

  return (
    <div className={approveItemContainer}>
      <Typography color="textSecondary" variant="subtitle1">
        {`${amount} ${assetName}`}
      </Typography>
      {showApproveFlow ? (
      <Button
        onClick={() => {
          approveCallback();
          setApprovalSubmitted(true);
        }}
        variant="contained"
        color="primary"
        className={transferButton}
        disabled={!showApproveFlow}
      >
        Approve
      </Button>) :
        pending ? ('Pending') : ('Approved')
      }
    </div>
  );

}