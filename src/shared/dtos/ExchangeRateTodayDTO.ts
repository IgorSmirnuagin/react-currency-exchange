import ExchangeRateDTO from './ExchangeRateDTO';
import { Currencies } from '../enums/Currencies';

export default interface ExchangeRateTodayDTO extends ExchangeRateDTO {
  rates: Record<Currencies, number>;
  date: string;
}
