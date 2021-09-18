import { ChainId } from '../../../constants';
import { Asset, Order } from 'hooks/marketplace/types';
import { OrderType } from '../../../utils/subgraph';

export type TransferData = {
  asset: Partial<Asset>;
} | null;

export type TransferDialogContextType = {
  isTransferDialogOpen: boolean;
  setTransferDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transferData?: TransferData;
  setTransferData: React.Dispatch<React.SetStateAction<TransferData>>;
};
