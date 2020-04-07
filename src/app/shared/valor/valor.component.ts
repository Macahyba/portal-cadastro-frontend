import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.scss']
})
export class ValorComponent implements OnInit, OnChanges {

  @Input() totalPrice: number = 0;
  totalDiscount: number = 0;
  totalDiscountControl = this._fb.control(0,
    [Validators.min(0), Validators.max(100), Validators.pattern('[0-9]{0,3}')]);

  totalPriceControl = this._fb.control('', [Validators.required, Validators.min(1)]);

  @Input() disabled: string;
  @Input() injectedDiscount: number = 0;
  @Input() parentFormGroup: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.totalPriceControl.setValue(this.totalPrice);
    this.parentFormGroup.registerControl('totalDiscount', this.totalDiscountControl);
    this.parentFormGroup.registerControl('totalPrice', this.totalPriceControl);
    this.parentFormGroup.controls.totalPrice.disable();
    this.totalDiscount = this.parentFormGroup.controls.totalDiscount.value;
  }

  ngOnChanges(){

    setTimeout(() => {

      if (this.injectedDiscount) this.parentFormGroup.controls.totalDiscount.setValue(this.injectedDiscount);
      if (this.disabled) this.parentFormGroup.controls.totalDiscount.disable();
    }, 0);

  }

  returnTotal(){
    this.totalPriceControl.setValue(this.totalPrice);
    return this.totalPrice*(1-this.totalDiscountControl.value/100);
  }
}
