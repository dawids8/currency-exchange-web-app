import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../service/currency.service';
import {Currencies} from './currency.enum';
import {CurrencyObject} from '../models/currency-object';
import {InputFormControl} from '../models/input.form.control';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  inputFormControl: InputFormControl;
  currencyTypes: Array<string>;
  currencyObject?: CurrencyObject;
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  outputValue: string;
  result: string;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fromCurrency = 'EUR';
    this.toCurrency = 'USD';
    this.loadExchangeRates(this.fromCurrency);

    this.inputFormControl = new InputFormControl();

    this.currencyTypes = Object.keys(Currencies).filter(k => typeof Currencies[k as any] === 'number');
  }

  calculateCurrencyValue(): void {
    this.loadExchangeRates(this.fromCurrency);
    let value = 0;

    Object.keys(this.currencyObject.rates).forEach((key: string) => {
      if (key === this.toCurrency) {
        value = this.currencyObject.rates[key] * Number(this.amount);
      }
    });

    this.outputValue = Number(this.amount) + ' ' + this.fromCurrency;
    this.result = value.toFixed(2) + ' ' + this.toCurrency;
  }

  private loadExchangeRates(fromCurrency: string) {
    this.currencyService.getValues(fromCurrency).subscribe(value => {
      this.currencyObject = value;
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  isButtonDisabled(fromCurrency: string, toCurrency: string, amount: string): boolean {
    return (!(fromCurrency === toCurrency || !amount || Number(amount) === 0));
  }
}
