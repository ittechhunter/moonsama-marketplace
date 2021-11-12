import { BigNumber } from '@ethersproject/bignumber';
import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { appStyles } from '../../app.styles';
import { CoinQuantityFieldStyles } from './CoinQuantityField.styles';

export enum UNIT {
  ETHER = 1,
  WEI = 2,
}

export const CoinQuantityField = (props: any) => {
  const setUnit = props.setUnit;
  const value: string = props.value ?? undefined;
  const setValue = props.setValue;
  const setMaxValue = props.setMaxValue;
  const withMaxButton = props.withMaxButton ?? false;

  const { formMaxButton } = appStyles();
  const { outlinedInput, coinSelect } = CoinQuantityFieldStyles();

  const _setMaxNumber = () => {
    setMaxValue?.();
  };

  const onUnitChange = (event: any) => {
    setUnit?.(event.target.value);
  };

  const onValueChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl className={props.className} variant="outlined">
        <OutlinedInput
          id={props.id}
          type="text"
          className={outlinedInput}
          //inputProps={{ min: 0 }}
          // onChange={(event: any) => inputToBigNum(event.target.value, setSendAmount)}
          onChange={onValueChange}
          value={value}
          labelWidth={0}
          endAdornment={
            withMaxButton ? (
              <InputAdornment position="end">
                <Button
                  className={formMaxButton}
                  onClick={() => {
                    _setMaxNumber();
                  }}
                >
                  MAX
                </Button>
              </InputAdornment>
            ) : (
              ''
            )
          }
        />
      </FormControl>
    </>
  );
};
