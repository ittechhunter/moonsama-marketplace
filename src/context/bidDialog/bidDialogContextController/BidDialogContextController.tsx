import { useEffect, useState } from 'react';

import { BidDialogContext } from '../bidDialogContext/BidDialogContext';
import { BidData } from '../bidDialogContext/BidDialogContext.types';

import { BidDialogContextControllerProps } from './BidDialogContextController.types';

export const BidDialogContextController = ({
  children,
}: BidDialogContextControllerProps) => {
  const [isBidDialogOpen, setBidDialogOpen] = useState<boolean>(false);
  const [bidData, setBidData] = useState<BidData>(null);

  useEffect(() => {
    if (!isBidDialogOpen) {
      setBidData(null);
    }
  }, [isBidDialogOpen]);

  return (
    <BidDialogContext.Provider
      value={{ isBidDialogOpen, setBidDialogOpen, bidData, setBidData }}
    >
      {children}
    </BidDialogContext.Provider>
  );
};
