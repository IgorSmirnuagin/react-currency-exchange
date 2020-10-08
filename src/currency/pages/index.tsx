import React from 'react';
import { Grid, Typography, Button, AppBar, Toolbar, Paper, Box, FormControl } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
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

  const useStyles = makeStyles(() =>
    createStyles({
      title: {
        marginTop: '60px',
        marginBottom: '10px',
      },
      card: {
        padding: 16,
      },
      box: {
        display: 'flex',
        alignItems: 'flex-end',
        '@media (max-width: 820px)': {
          flexWrap: 'wrap',
          width: '100%',
          alignItems: 'center',
        },
      },
      control: {
        margin: '0 10px',
        '@media (max-width: 820px)': {
          marginTop: 20,
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
        },
      },
      separator: {
        width: 1,
        height: 40,
        background: 'rgba(0, 0, 0, .25)',
        margin: '0 30px',
        alignSelf: 'center',
        '@media (max-width: 820px)': {
          display: 'none',
        },
      },
      button: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 15,
        '@media (max-width: 820px)': {
          justifyContent: 'center',
        },
      },
      chart: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px -10px',
      },
      panel: {
        minWidth: 700,
        width: 'auto',
        '@media (max-width: 920px)': {
          width: '100%',
          minWidth: 'initial',
        },
      },
    }),
  );

  const classes = useStyles();

  return (
    <Box m={2}>
      <AppBar position="fixed">
        <Toolbar variant="regular">
          <AttachMoneyIcon />
          <Typography variant="h6">Currency Rates</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" align="left" className={classes.title}>
            How much is
          </Typography>
        </Grid>
        <Box className={classes.panel}>
          <Paper className={classes.card}>
            <Box className={classes.box}>
              <FormControl className={classes.control}>
                <ExchangeField
                  value={currencyValue}
                  onChange={(value) => setCurrencyFromValue(value)}
                  currency={currencyFrom}
                  onCurrencyChange={(currency) => setCurrencyFrom(currency)}
                />
              </FormControl>
              <FormControl className={classes.control}>in</FormControl>
              <FormControl className={classes.control}>
                <TargetCurrenciesSelect value={selectedCurrencies} onChange={(e) => selectCurrency(e)} />
              </FormControl>

              <span className={classes.separator} />
              <FormControl className={classes.control}>
                <ExchangeMode mode={mode} onChange={(e) => changeMode(e)} />
              </FormControl>
            </Box>
            {mode === 'Period' && (
              <Box className={classes.box}>
                <ExchangeDateRange from={from} onFromChange={(e) => setFrom(e)} to={to} onToChange={(e) => setTo(e)} />
              </Box>
            )}
            <Box className={classes.button}>
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
            </Box>
          </Paper>
        </Box>
      </Grid>
      {mode === 'Latest' && latestRate && <ExchangeTable rows={toRow(currencyValue, latestRate)} />}
      {mode === 'Period' && historyRates.length > 0 && (
        <Box className={classes.chart}>
          {selectedCurrencies.map((cur) => (
            <ExchangeChart
              key={cur}
              currency={cur}
              data={historyRates.map((r) => ({ x: r.at, y: r.currencyRates[cur] * currencyValue }))}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default enhance(CurrencyPage);
