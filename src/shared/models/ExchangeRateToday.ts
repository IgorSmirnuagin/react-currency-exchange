import Rate from './Rate';
import ExchangeRateTodayDTO from '../dtos/ExchangeRateTodayDTO';

type ExchangeRateToday = {
  rates: Rate;
  date: Date;
};

export default ExchangeRateToday;

export class ExchangeRateTodayModel {
  public static fromDto(dto: ExchangeRateTodayDTO): ExchangeRateToday {
    const { date, base, rates } = dto;
    const at = new Date(date);
    return {
      rates: {
        currencyRates: rates,
        base,
        at,
      },
      date: at,
    };
  }
}
