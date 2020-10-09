import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

type Props = {
  rows: { currency: string; value: string }[];
};

export default function ExchangeTable(props: Props): JSX.Element {
  const { rows } = props;

  const useStyles = makeStyles(() =>
    createStyles({
      box: {
        marginTop: 20,
      },
    }),
  );

  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.currency}>
                <TableCell component="th" scope="row">
                  {r.currency}
                </TableCell>
                <TableCell>{r.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
