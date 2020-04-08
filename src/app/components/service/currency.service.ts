import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  public getValues(currencyType: string): Observable<CurrencyObject> {
    const param = new HttpParams().set('base', currencyType);
    return this.httpClient.get<CurrencyObject>('https://api.exchangeratesapi.io/latest', {params: param});
  }
}

export interface CurrencyObject {
  rates: { [key: string]: number };
  base: string;
  date: string;
}
