import { Grid, MenuItem, Select } from '@material-ui/core';
import React from 'react';
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
  value: Currencies[];
  onChange: (value: Currencies[]) => void;
};

export default function TargetCurrenciesSelect(props: Props): JSX.Element {
  const { value, onChange } = props;
  return (
    <Grid container justify="center" alignItems="flex-end">
      <Select multiple value={value} MenuProps={MenuProps} onChange={(e) => onChange(e.target.value as Currencies[])}>
        {Object.keys(Currencies).map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
}
