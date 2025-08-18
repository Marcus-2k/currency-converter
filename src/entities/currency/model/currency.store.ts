import { Injectable, computed, signal } from "@angular/core";
import { CurrencyApi } from "../api/currency.api";
import { Currency } from "./currency.model";

@Injectable({ providedIn: "root" })
export class CurrencyStore {
  currencies = signal<Currency[] | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private api: CurrencyApi) {}

  loadOnce() {
    if (this.currencies() || this.loading()) {
      return;
    }

    this.loading.set(true);

    this.error.set(null);

    this.api.getCurrencies().subscribe({
      next: (list) => {
        this.currencies.set(list);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set("Failed to load currencies");
        this.loading.set(false);
        console.error(e);
      },
    });
  }

  hasData = computed(() => !!this.currencies()?.length);
}
