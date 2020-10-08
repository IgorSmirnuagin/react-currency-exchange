import React from 'react';
import { Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles, createStyles } from '@material-ui/core/styles';

type Props = {
  from: Date;
  onFromChange: (from: Date) => void;
  to: Date;
  onToChange: (from: Date) => void;
};

export default function ExchangeDateRange(props: Props): JSX.Element {
  const { from, to, onFromChange, onToChange } = props;

  const useStyles = makeStyles(() =>
    createStyles({
      row: {
        marginTop: 20,
        '@media (max-width: 820px)': {
          justifyContent: 'center',
        },
      },
      fieldTo: {
        marginLeft: 50,
        '@media (max-width: 820px)': {
          margin: '0 10px',
        },
      },
      fieldFrom: {
        marginLeft: 10,
        '@media (max-width: 820px)': {
          margin: '0 10px',
        },
      },
    }),
  );

  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="center" className={classes.row}>
      <KeyboardDatePicker
        className={classes.fieldFrom}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        value={from}
        onChange={(e) => onFromChange(e as Date)}
        label="from"
      />

      <KeyboardDatePicker
        className={classes.fieldTo}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        value={to}
        onChange={(e) => onToChange(e as Date)}
        label="to"
      />
    </Grid>
  );
}
