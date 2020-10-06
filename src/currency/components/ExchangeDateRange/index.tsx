import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

type Props = {
  from: Date;
  onFromChange: (from: Date) => void;
  to: Date;
  onToChange: (from: Date) => void;
};

export default function ExchangeDateRange(props: Props): JSX.Element {
  const { from, to, onFromChange, onToChange } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Typography>from</Typography>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        value={from}
        onChange={(e) => onFromChange(e as Date)}
      />
      <Typography>to</Typography>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        value={to}
        onChange={(e) => onToChange(e as Date)}
      />
    </Grid>
  );
}
