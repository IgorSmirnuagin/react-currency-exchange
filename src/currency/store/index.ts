import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { isBefore, subDays } from 'date-fns';
import { Currencies } from '../../shared/enums/Currencies';
import Rate from '../../shared/models/Rate';
import loadLatest from './loadLatest';
import loadHistory from './loadHistory';

type CurrencyState = {
  loading: boolean;
  currencyFrom: Currencies;
  currencyFromValue: number;
  selectedCurrencies: Currencies[];
  historyRates: Rate[];
  latestRate?: Rate;
  mode: 'Latest' | 'Period';
  from: Date;
  to: Date;
};

const initialState: CurrencyState = {
  loading: false,
  currencyFrom: Currencies.GBP,
  currencyFromValue: 200,
  selectedCurrencies: [Currencies.USD, Currencies.EUR],
  historyRates: [],
  mode: 'Latest',
  to: new Date(),
  from: subDays(new Date(), 1),
};

const currencySlice = createSlice<CurrencyState, SliceCaseReducers<CurrencyState>>({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencyFromValue: (state, action: PayloadAction<number>) => {
      state.currencyFromValue = action.payload;
    },
    setCurrencyFrom: (state, action: PayloadAction<Currencies>) => {
      state.currencyFrom = action.payload;
    },
    selectCurrency: (state, action: PayloadAction<Currencies[]>) => {
      state.selectedCurrencies = action.payload;
    },
    changeMode: (state, action: PayloadAction<'Latest' | 'Period'>) => {
      state.mode = action.payload;
    },
    setFrom: (state, action: PayloadAction<Date>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<Date>) => {
      state.to = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadLatest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadLatest.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loadLatest.fulfilled, (state, action) => {
      state.loading = false;
      state.latestRate = action.payload.rates;
    });
    builder.addCase(loadHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadHistory.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loadHistory.fulfilled, (state, action) => {
      state.loading = false;
      const { rates } = action.payload;
      rates.sort((a, b) => (isBefore(new Date(a.at), new Date(b.at)) ? -1 : 1));
      state.historyRates = rates;
    });
  },
});

const { actions, reducer } = currencySlice;

export const { setCurrencyFromValue, setCurrencyFrom, selectCurrency, changeMode, setFrom, setTo } = actions;
export default reducer;
