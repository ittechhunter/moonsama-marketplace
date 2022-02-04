import { Asset } from 'hooks/marketplace/types';

export type ApproveData = {
  asset: Partial<Asset>;
  decimals?: number;
} | null;

export type ApproveDialogContextType = {
  isApproveDialogOpen: boolean;
  setApproveDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  approveData?: ApproveData;
  setApproveData: React.Dispatch<React.SetStateAction<ApproveData>>;
};
