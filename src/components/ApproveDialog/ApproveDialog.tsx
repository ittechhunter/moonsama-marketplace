import { BigNumber } from '@ethersproject/bignumber';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { AssetLink } from 'components/AssetLink/AssetLink';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import { AddressDisplayComponent } from 'components/form/AddressDisplayComponent';
import { NumberFieldWithMaxButton } from 'components/form/NumberFieldWithMaxButton';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';
import { StringAssetType } from 'utils/subgraph';
import { parseUnits } from '@ethersproject/units';
import { useBalances } from 'hooks/useBalances/useBalances';

import { SuccessIcon } from 'icons/Success/success';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSubmittedTransferTx } from 'state/transactions/hooks';
import { Button, Dialog } from 'ui';
import { getExplorerLink } from 'utils';
import * as yup from 'yup';
import { appStyles } from '../../app.styles';
import { ChainId } from '../../constants';
import { useApproveDialog } from '../../hooks/useApproveDialog/useApproveDialog';
import { styles } from './ApproveDialog.styles';
import { Box, FormControl, OutlinedInput } from '@mui/material';
import { Fraction } from 'utils/Fraction';
import { useClasses } from '../../hooks';

type TransferFormData = {
  recipient: string;
};

export const ApproveDialog = () => {
  const { isApproveDialogOpen, setApproveDialogOpen, approveData } =
    useApproveDialog();
  const { dialogContainer, loadingContainer, successContainer, successIcon } =
    useClasses(styles);

  const renderBody = () => {

    return (
      <>

      </>
    );
  };
  return (
    <Dialog
      open={isApproveDialogOpen}
      title={'Approve asset'}
    >
      <div className={dialogContainer}>{renderBody()}</div>
    </Dialog>
  );
};
