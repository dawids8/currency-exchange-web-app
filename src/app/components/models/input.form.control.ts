import {FormControl, Validators} from '@angular/forms';

export class InputFormControl {
  amountForm;
  fromCurrencyForm;
  toCurrencyForm;

  constructor() {
    this.amountForm = new FormControl('', Validators.required);
    this.fromCurrencyForm = new FormControl('', Validators.required);
    this.toCurrencyForm = new FormControl('', Validators.required);
  }
}
