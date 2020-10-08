import React from 'react';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { Currencies } from '../../../shared/enums/Currencies';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  value: number;
  onChange: (value: number) => void;
  currency: Currencies;
  onCurrencyChange: (currency: Currencies) => void;
};

export default function ExchangeField(props: Props): JSX.Element {
  const { value, currency, onChange, onCurrencyChange } = props;
  return (
    <Grid container direction="row" alignItems="flex-end" justify="center">
      <TextField
        id="standard-basic"
        label="Money"
        value={value}
        onChange={(e) => {
          const inputValue = Number(e.target.value);
          // eslint-disable-next-line no-restricted-globals
          if (!isNaN(inputValue)) {
            onChange(inputValue);
          }
        }}
      />
      <Select value={currency} MenuProps={MenuProps} onChange={(e) => onCurrencyChange(e.target.value as Currencies)}>
        {Object.keys(Currencies).map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
}
