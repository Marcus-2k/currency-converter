import { DecimalPipe, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CardModule } from "primeng/card";

@Component({
  selector: "feature-convert-result",
  standalone: true,
  imports: [CardModule, NgIf, DecimalPipe],
  templateUrl: "./convert-result.component.html",
  styleUrl: "./convert-result.component.scss",
})
export class ConvertResultComponent {
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() result: { amount: number; rate: number; inverseRate: number; timestamp?: string } | null = null;
  @Input() from = "";
  @Input() to = "";
  @Input() baseAmount = 0;
}
