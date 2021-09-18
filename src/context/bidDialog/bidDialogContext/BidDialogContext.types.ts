import { Asset } from 'hooks/marketplace/types';
import { OrderType } from '../../../utils/subgraph';

export type BidData = {
  asset?: Asset;
  orderType: OrderType;
} | null;

export type BidDialogContextType = {
  isBidDialogOpen: boolean;
  setBidDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bidData?: BidData;
  setBidData: React.Dispatch<React.SetStateAction<BidData>>;
};
