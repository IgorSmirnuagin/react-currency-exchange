import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import ExchangeRateTodayDTO from '../../shared/dtos/ExchangeRateTodayDTO';
import { AsyncThunkConfig } from '../../store';
import { Currencies } from '../../shared/enums/Currencies';
import ExchangeRateToday, { ExchangeRateTodayModel } from '../../shared/models/ExchangeRateToday';

const loadLatest = createAsyncThunk<
  ExchangeRateToday,
  { currency: Currencies; selectedCurrencies: Currencies[] },
  AsyncThunkConfig
>('currency/load/today', async ({ currency, selectedCurrencies }, { rejectWithValue }) => {
  try {
    const response = await axios.get<ExchangeRateTodayDTO>(
      `/latest?base=${currency}&symbols=${selectedCurrencies.join(',')}`,
    );
    return ExchangeRateTodayModel.fromDto(response.data);
  } catch (e) {
    const err = e as AxiosError;
    if (err) {
      rejectWithValue(err.response?.data);
    }
    return rejectWithValue((e as Error).message);
  }
});

export default loadLatest;
