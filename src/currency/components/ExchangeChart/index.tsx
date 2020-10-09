import React from 'react';
import { Typography, Paper, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory';
import { Currencies } from '../../../shared/enums/Currencies';

type Props = {
  currency: Currencies;
  data: { x: string; y: number }[];
};

export default function ExchangeChart(props: Props): JSX.Element {
  const useStyles = makeStyles(() =>
    createStyles({
      item: {
        padding: '0 10px',
        maxWidth: '33.33%',
        flex: '0 0 33.33%',
        boxSizing: 'border-box',
        marginBottom: 20,
        '@media (max-width: 980px)': {
          maxWidth: '50%',
          flex: '0 0 50%',
        },
        '@media (max-width: 690px)': {
          maxWidth: '100%',
          flex: '0 0 100%',
        },
      },
      box: {
        overflow: 'auto',
        padding: 8,
      },
    }),
  );

  const classes = useStyles();

  const { currency, data } = props;
  return (
    <Box className={classes.item}>
      <Paper className={classes.box}>
        <Typography variant="h6">{currency}</Typography>
        <VictoryChart
          style={{ parent: { height: 400, width: 400 } }}
          theme={VictoryTheme.material}
          containerComponent={<VictoryZoomContainer />}
        >
          <VictoryLine data={data} />
          <VictoryAxis crossAxis fixLabelOverlap style={{ tickLabels: { padding: 20 } }} />
          <VictoryAxis dependentAxis crossAxis fixLabelOverlap />
        </VictoryChart>
      </Paper>
    </Box>
  );
}
