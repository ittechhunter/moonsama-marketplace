import { Asset } from 'hooks/marketplace/types';
import { OrderType } from '../../../utils/subgraph';

export type BidData = {
  asset?: Asset;
  orderType: OrderType;
  decimals?: number;
  name?: string;
  symbol?: string;
} | undefined;

export type BidDialogContextType = {
  isBidDialogOpen: boolean;
  setBidDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bidData?: BidData;
  setBidData: React.Dispatch<React.SetStateAction<BidData>>;
};
