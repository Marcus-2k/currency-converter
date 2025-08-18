import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

export interface ConvertQuery {
  from: string;
  to: string;
  amount: number;
}
export interface ConvertResult {
  amount: number;
  rate: number;
  inverseRate: number;
  timestamp?: string;
}

@Injectable({ providedIn: "root" })
export class ConvertApi {
  constructor(private http: HttpClient) {}

  convert(q: ConvertQuery) {
    return this.http
      .get("/api/v1/convert", {
        params: { from: q.from, to: q.to, amount: q.amount },
      })
      .pipe(
        map((raw: any): ConvertResult => {
          console.log("raw", raw);

          const r = raw?.response ?? raw?.data ?? raw;
          const amount = Number(r?.value ?? r?.result ?? 0);
          const rate = Number(r?.rate ?? (q.amount ? amount / q.amount : 0));
          const inverseRate = rate ? 1 / rate : 0;
          const ts = r?.timestamp ?? r?.updated_at ?? r?.date ?? undefined;

          return { amount, rate, inverseRate, timestamp: ts };
        }),
      );
  }
}
