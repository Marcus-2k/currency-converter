import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, shareReplay } from "rxjs";
import { Currency } from "../model/currency.model";

export interface CurrencyResponse {
  response: Currency[];
}

@Injectable({ providedIn: "root" })
export class CurrencyApi {
  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http.get<CurrencyResponse>("/api/v1/currencies").pipe(
      map((data: CurrencyResponse): Currency[] => {
        const src = data.response;

        if (Array.isArray(src)) {
          return src.map((x: Currency) => ({
            code: x.code,
            name: x.name,
            symbol: x.symbol,
          }));
        }

        return Object.entries(src).map(([code, v]: [string, any]) => ({
          code,
          name: v?.name ?? v?.description,
          symbol: v?.symbol,
        }));
      }),
    );
  }
}
