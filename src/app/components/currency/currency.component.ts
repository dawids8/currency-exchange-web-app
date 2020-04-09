import { Component, OnInit } from '@angular/core';
import {CurrencyObject, CurrencyService} from '../service/currency.service';
import {Currencies} from './currency.enum';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currencyTypes: Array<string> = Object.keys(Currencies).filter(k => typeof Currencies[k as any] === 'number');
  currencyObject: CurrencyObject;
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  result: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}

  calculateCurrencyValue(): string {
    this.loadExchangeRates(this.fromCurrency);
    let value = 0;

    for (const ratesKey in this.currencyObject.rates) {
      if (ratesKey === this.toCurrency) {
        value = this.currencyObject.rates[ratesKey] * Number(this.amount);
      }
    }

    this.result = value;
  }

  private loadExchangeRates(fromCurrency: string) {
    this.currencyService.getValues(fromCurrency).subscribe(value => {
      this.currencyObject = value;
    });
  }

}
