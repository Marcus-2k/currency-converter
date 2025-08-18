import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { Currency } from "../../../../entities/currency/model/currency.model";

interface Option {
  label: string;
  value: string;
}

@Component({
  selector: "feature-convert-form",
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, InputNumberModule, ButtonModule],
  templateUrl: "./convert-form.component.html",
  styleUrl: "./convert-form.component.scss",
})
export class ConvertFormComponent {
  @Input({ required: true }) set currencies(currencies: Currency[] | null) {
    this.options = (currencies ?? []).map((currency) => ({
      label: `${currency.code}${currency.name ? ` — ${currency.name}` : ""}`,
      value: currency.code,
    }));
  }

  @Input({ required: true }) disabled!: boolean;
  @Output() convert = new EventEmitter<{ from: string; to: string; amount: number }>();

  options: Option[] = [];
  form = new FormBuilder().nonNullable.group({
    from: [null, Validators.required],
    to: [null, Validators.required],
    amount: [1, [Validators.required, Validators.min(0)]],
  });

  swap(): void {
    const { from, to } = this.form.getRawValue();
    this.form.patchValue({ from: to, to: from });
  }

  onSubmit(): void {
    const { from, to, amount } = this.form.getRawValue();
    if (from && to && amount && amount > 0) {
      this.convert.emit({ from, to, amount });
    }
  }
}
