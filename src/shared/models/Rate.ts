import { Currencies } from '../enums/Currencies';

type Rate = {
  at: string;
  currencyRates: Record<Currencies, number>;
  base: Currencies;
};

export default Rate;
