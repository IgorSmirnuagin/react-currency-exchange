import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { format } from 'date-fns';
import { Currencies } from '../../shared/enums/Currencies';
import { setCurrencyFrom, selectCurrency, setCurrencyFromValue, changeMode, setFrom, setTo } from '../store';
import { RootState } from '../../store';
import loadLatest from '../store/loadLatest';
import Rate from '../../shared/models/Rate';
import loadHistory from '../store/loadHistory';
import ExchangeTable from '../components/ExchangeTable';
import ExchangeChart from '../components/ExchangeChart';
import ExchangeField from '../components/ExchangeField';
import TargetCurrenciesSelect from '../components/TargetCurrenciesSelect';
import ExchangeMode from '../components/ExchangeMode';
import ExchangeDateRange from '../components/ExchangeDateRange';

function toRow(value: number, rates: Rate) {
  return rates
    ? Object.keys(rates.currencyRates).map((cur) => ({
        id: cur,
        currency: cur,
        value: (rates.currencyRates[cur as Currencies] * value).toFixed(2),
      }))
    : [];
}

const mapStateToProps = (state: RootState) => ({
  currencyValue: state.currency.currencyFromValue,
  currencyFrom: state.currency.currencyFrom,
  selectedCurrencies: state.currency.selectedCurrencies,
  latestRate: state.currency.latestRate,
  historyRates: state.currency.historyRates,
  mode: state.currency.mode,
  from: state.currency.from,
  to: state.currency.to,
});

const mapDispatchToProps = {
  setCurrencyFromValue,
  setCurrencyFrom,
  selectCurrency,
  setFrom,
  setTo,
  changeMode,
  loadToday: loadLatest,
  loadHistory,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof enhance>;

function CurrencyPage(props: Props) {
  const {
    currencyValue,
    currencyFrom,
    selectedCurrencies,
    latestRate,
    historyRates,
    mode,
    from,
    to,
    selectCurrency,
    setCurrencyFromValue,
    setCurrencyFrom,
    changeMode,
    setFrom,
    setTo,
    loadToday,
    loadHistory,
  } = props;
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h3" align="center">
        Currency Rates
      </Typography>
      <Typography variant="h6" align="center">
        How much is
      </Typography>
      <ExchangeField
        value={currencyValue}
        onChange={(value) => setCurrencyFromValue(value)}
        currency={currencyFrom}
        onCurrencyChange={(currency) => setCurrencyFrom(currency)}
      />
      <Grid container justify="center" alignItems="flex-end">
        <Typography>in</Typography>
      </Grid>
      <TargetCurrenciesSelect value={selectedCurrencies} onChange={(e) => selectCurrency(e)} />
      <ExchangeMode mode={mode} onChange={(e) => changeMode(e)} />
      {mode === 'Period' && (
        <ExchangeDateRange from={from} onFromChange={(e) => setFrom(e)} to={to} onToChange={(e) => setTo(e)} />
      )}
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (mode === 'Latest') {
              loadToday({ currency: currencyFrom, selectedCurrencies });
            } else {
              loadHistory({
                currency: currencyFrom,
                selectedCurrencies,
                from: format(new Date(from), 'yyyy-MM-dd'),
                to: format(new Date(to), 'yyyy-MM-dd'),
              });
            }
          }}
        >
          Calculate
        </Button>
      </Grid>
      {mode === 'Latest' && latestRate && <ExchangeTable rows={toRow(currencyValue, latestRate)} />}
      {mode === 'Period' &&
        historyRates.length > 0 &&
        selectedCurrencies.map((cur) => (
          <ExchangeChart
            currency={cur}
            data={historyRates.map((r) => ({ x: r.at, y: r.currencyRates[cur] * currencyValue }))}
          />
        ))}
    </Grid>
  );
}

export default enhance(CurrencyPage);
