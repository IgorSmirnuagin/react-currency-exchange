import ExchangeRateHistoryDTO from '../dtos/ExchangeRateHistoryDTO';
import Rate from './Rate';

type ExchangeRateHistory = {
  rates: Rate[];
  startAt: string;
  endAt: string;
};

export default ExchangeRateHistory;

export class ExchangeRateHistoryModel {
  public static fromDto(dto: ExchangeRateHistoryDTO): ExchangeRateHistory {
    const { start_at, end_at, base, rates } = dto;
    const rateModels: Rate[] = [];
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const rateDate in rates) {
      rateModels.push({
        base,
        at: rateDate,
        currencyRates: rates[rateDate],
      });
    }
    return {
      rates: rateModels,
      startAt: start_at,
      endAt: end_at,
    };
  }
}
