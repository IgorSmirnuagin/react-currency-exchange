import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory';
import { Currencies } from '../../../shared/enums/Currencies';

type Props = {
  currency: Currencies;
  data: { x: string; y: number }[];
};

export default function ExchangeChart(props: Props): JSX.Element {
  const { currency, data } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Typography variant="h4">{currency}</Typography>
      <VictoryChart
        style={{ parent: { height: 400, width: 400 } }}
        theme={VictoryTheme.material}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryLine data={data} />
        <VictoryAxis crossAxis fixLabelOverlap style={{ tickLabels: { padding: 20 } }} />
        <VictoryAxis dependentAxis crossAxis fixLabelOverlap />
      </VictoryChart>
    </Grid>
  );
}
