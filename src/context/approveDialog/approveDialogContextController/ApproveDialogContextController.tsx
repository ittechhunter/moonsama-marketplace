import React, { useEffect, useState } from 'react';

import { ApproveDialogContext } from '../approveDialogContext/ApproveDialogContext';
import { ApproveData } from '../approveDialogContext/ApproveDialogContext.types';

import { ApproveDialogContextControllerProps } from './ApproveDialogContextController.types';

export const ApproveDialogContextController = ({
  children,
}: ApproveDialogContextControllerProps) => {
  const [isApproveDialogOpen, setApproveDialogOpen] =
    useState<boolean>(false);
  const [approveData, setApproveData] = useState<ApproveData>(null);

  useEffect(() => {
    if (!isApproveDialogOpen) {
      setApproveData(null);
    }
  }, [isApproveDialogOpen]);

  return (
    <ApproveDialogContext.Provider
      value={{
        isApproveDialogOpen,
        setApproveDialogOpen,
        approveData,
        setApproveData,
      }}
    >
      {children}
    </ApproveDialogContext.Provider>
  );
};
