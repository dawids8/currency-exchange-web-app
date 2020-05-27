export interface CurrencyObject {
  rates: { [key: string]: number };
  base: string;
  date: string;
}
