import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AsyncThunkConfig } from '../../store';
import { Currencies } from '../../shared/enums/Currencies';
import ExchangeRateHistory, { ExchangeRateHistoryModel } from '../../shared/models/ExchangeRateHistory';
import ExchangeRateHistoryDTO from '../../shared/dtos/ExchangeRateHistoryDTO';

const loadHistory = createAsyncThunk<
  ExchangeRateHistory,
  { from: string; to: string; currency: Currencies; selectedCurrencies: Currencies[] },
  AsyncThunkConfig
>('currency/load/history', async ({ from, to, currency, selectedCurrencies }, { rejectWithValue }) => {
  try {
    const response = await axios.get<ExchangeRateHistoryDTO>(
      `/history?base=${currency}&symbols=${selectedCurrencies.join(',')}&start_at=${from}&end_at=${to}`,
    );
    return ExchangeRateHistoryModel.fromDto(response.data);
  } catch (e) {
    const err = e as AxiosError;
    if (err) {
      rejectWithValue(err.response?.data);
    }
    return rejectWithValue((e as Error).message);
  }
});

export default loadHistory;
