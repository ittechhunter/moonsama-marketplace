import { createContext } from 'react';

import { ApproveDialogContextType } from './ApproveDialogContext.types';

export const ApproveDialogContext = createContext<
ApproveDialogContextType | undefined
>(undefined);
