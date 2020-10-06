import ExchangeRateHistoryDTO from '../dtos/ExchangeRateHistoryDTO';
import Rate from './Rate';

type ExchangeRateHistory = {
  rates: Rate[];
  startAt: Date;
  endAt: Date;
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
        at: new Date(rateDate),
        currencyRates: rates[rateDate],
      });
    }
    return {
      rates: rateModels,
      startAt: new Date(start_at),
      endAt: new Date(end_at),
    };
  }
}
