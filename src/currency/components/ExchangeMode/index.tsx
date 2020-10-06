import React from 'react';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';

type Props = {
  mode: 'Latest' | 'Period';
  onChange: (mode: 'Latest' | 'Period') => void;
};

export default function ExchangeMode(props: Props): JSX.Element {
  const { mode, onChange } = props;
  return (
    <Grid container justify="center" alignItems="flex-end">
      <RadioGroup
        row
        value={mode}
        onChange={(e) => {
          if (e.target.value === 'Latest') {
            onChange('Latest');
          } else {
            onChange('Period');
          }
        }}
      >
        <FormControlLabel value="Latest" control={<Radio />} label="Latest" labelPlacement="end" />
        <FormControlLabel value="Period" control={<Radio />} label="In Period" labelPlacement="end" />
      </RadioGroup>
    </Grid>
  );
}
