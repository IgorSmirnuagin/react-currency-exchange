import Rate from './Rate';
import ExchangeRateTodayDTO from '../dtos/ExchangeRateTodayDTO';

type ExchangeRateToday = {
  rates: Rate;
  date: string;
};

export default ExchangeRateToday;

export class ExchangeRateTodayModel {
  public static fromDto(dto: ExchangeRateTodayDTO): ExchangeRateToday {
    const { date, base, rates } = dto;
    return {
      rates: {
        currencyRates: rates,
        base,
        at: date,
      },
      date,
    };
  }
}
