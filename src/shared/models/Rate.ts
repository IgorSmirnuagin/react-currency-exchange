import { Currencies } from '../enums/Currencies';

type Rate = {
  at: Date;
  currencyRates: Record<Currencies, number>;
  base: Currencies;
};

export default Rate;
