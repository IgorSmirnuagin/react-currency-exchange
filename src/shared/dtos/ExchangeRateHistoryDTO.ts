import ExchangeRateDTO from './ExchangeRateDTO';
import { Currencies } from '../enums/Currencies';

export default interface ExchangeRateHistoryDTO extends ExchangeRateDTO {
  rates: Record<string, Record<Currencies, number>>;
  start_at: string;
  end_at: string;
}
