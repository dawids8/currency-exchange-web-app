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
  result: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}

  calculateCurrencyValue(fromCurrency: string, toCurrency: string, valueToExchange: number) {
    this.loadExchangeRates(fromCurrency);
    let value = 0;

    for (const ratesKey in this.currencyObject.rates) {
      if (ratesKey === toCurrency) {
        value = this.currencyObject.rates[ratesKey] * valueToExchange;
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
