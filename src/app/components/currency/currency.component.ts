import { Component, OnInit } from '@angular/core';
import {CurrencyObject, CurrencyService} from '../service/currency.service';
import {Currencies} from './currency.enum';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  inputAmountForm = new FormControl('', Validators.required);
  fromCurrencyForm = new FormControl('', Validators.required);
  toCurrencyForm = new FormControl('', Validators.required);
  currencyTypes: Array<string> = Object.keys(Currencies).filter(k => typeof Currencies[k as any] === 'number');
  currencyObject: CurrencyObject;
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  outputValue: number;
  result: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fromCurrency = 'EUR';
    this.toCurrency = 'USD';
  }

  calculateCurrencyValue(): void {
    this.loadExchangeRates(this.fromCurrency);
    let value = 0;

    Object.keys(this.currencyObject.rates).forEach((key: string) => {
      if (key === this.toCurrency) {
        value = this.currencyObject.rates[key] * Number(this.amount);
      }
    });

    this.outputValue = Number(this.amount);
    this.result = value;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private loadExchangeRates(fromCurrency: string) {
    this.currencyService.getValues(fromCurrency).subscribe(value => {
      this.currencyObject = value;
    });
  }
}
