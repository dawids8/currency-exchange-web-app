import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrencyObject} from '../models/currency-object';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  public getValues(type: string): Observable<CurrencyObject> {
    const param = new HttpParams().set('base', type);
    return this.httpClient.get<CurrencyObject>('https://api.exchangeratesapi.io/latest', {params: param});
  }
}
