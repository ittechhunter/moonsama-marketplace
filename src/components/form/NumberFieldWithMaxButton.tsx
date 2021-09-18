import { BigNumber } from '@ethersproject/bignumber';
import { FormControl, InputAdornment, OutlinedInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { appStyles } from '../../app.styles';
import { useStyles } from './NumberFieldWithMaxButton.styles';

export const NumberFieldWithMaxButton = (props: any) => {
  const fieldType = props.type || 'number';
  const setMaxValue = props.setMaxValue;
  const value = props.value ?? undefined;
  const setValue = props.setValue;

  const { formMaxButton } = appStyles();
  const { outlinedInput } = useStyles();

  const _setMaxNumber = () => {
    setMaxValue?.()
  };

  const onChange = (event: any) => {
    setValue(event.target.value)
  };

  return (
    <React.Fragment>
      <FormControl className={props.className} variant="outlined">
        <OutlinedInput
          id={props.id}
          type={fieldType}
          className={outlinedInput}
          inputProps={{ min: 0 }}
          onChange={onChange}
          endAdornment={
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
          }
          value={value}
          labelWidth={0}
        />
      </FormControl>
    </React.Fragment>
  );
};
