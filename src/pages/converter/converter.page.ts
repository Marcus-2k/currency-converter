import { NgIf } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { SkeletonModule } from "primeng/skeleton";

import { ConvertApi, ConvertResult } from "../../entities/currency/api/convert.api";
import { CurrencyStore } from "../../entities/currency/model/currency.store";
import { ConvertFormComponent } from "../../features/convert/ui/convert-form/convert-form.component";
import { ConvertResultComponent } from "../../features/convert/ui/convert-result/convert-result.component";

@Component({
  standalone: true,
  selector: "page-converter",
  imports: [NgIf, SkeletonModule, ConvertFormComponent, ConvertResultComponent],
  templateUrl: "./converter.page.html",
  styleUrl: "./converter.page.scss",
})
export class ConverterPage implements OnInit {
  constructor(public store: CurrencyStore, private api: ConvertApi) {}

  converting = signal(false);
  error = signal<string | null>(null);
  result = signal<ConvertResult | null>(null);
  from = signal("");
  to = signal("");
  baseAmount = signal(0);

  ngOnInit(): void {
    this.store.loadOnce();
  }

  onConvert(ev: { from: string; to: string; amount: number }) {
    this.error.set(null);
    this.result.set(null);
    this.converting.set(true);
    this.from.set(ev.from);
    this.to.set(ev.to);
    this.baseAmount.set(ev.amount);

    if (ev.from === ev.to) {
      // trivial case
      const r = { amount: ev.amount, rate: 1, inverseRate: 1 } as ConvertResult;
      this.result.set(r);
      this.converting.set(false);
      return;
    }

    this.api.convert(ev).subscribe({
      next: (r) => {
        this.result.set(r);
        this.converting.set(false);
      },
      error: (e) => {
        this.error.set("Conversion failed");
        this.converting.set(false);
        console.error(e);
      },
    });
  }
}
