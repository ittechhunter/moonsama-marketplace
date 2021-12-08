import { SortSharp } from '@mui/icons-material';
import React, { useState } from 'react';
import { Select } from 'ui/Select/Select';
import { useStyles } from './Sort.style';

interface Props {
  onSortUpdate: (option: SortOption) => void;
}

export enum SortOption {
    UNSELECTED=0,
    PRICE_ASC=1,
    PRICE_DESC=2,
    TOKEN_ID_ASC=3,
    TOKEN_ID_DESC=4
}

export const Sort = ({ onSortUpdate }: Props) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(SortOption.UNSELECTED);
  const {
    sortElement
  } = useStyles();

  const handleApplySort = () => {
    onSortUpdate(selectedSort);
  };

  return (
    <Select className={sortElement}
        variant="outlined"
        color="primary"
        IconComponent={SortSharp}
        defaultValue={SortOption.TOKEN_ID_ASC}
        inputProps={{
            name: 'sort',
            id: 'uncontrolled-native'
        }}
        
        onSelect={handleApplySort}
    >
        <option value={SortOption.PRICE_ASC}>Price ascending</option>
        <option value={SortOption.PRICE_DESC}>Price descending</option>
        <option value={SortOption.TOKEN_ID_ASC}>Token ID ascending</option>
        <option value={SortOption.TOKEN_ID_DESC}>Token ID descending</option>
    </Select>
  );
};
