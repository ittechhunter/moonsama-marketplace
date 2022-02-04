import { useContext } from 'react';
import { ApproveDialogContext } from '../../context/approveDialog/approveDialogContext/ApproveDialogContext';

export const useApproveDialog = () => {
  const context = useContext(ApproveDialogContext);

  if (context === undefined) {
    throw new Error(
      'useApproveDialog must be used within an ApproveDialogContextController'
    );
  }
  return context;
};
