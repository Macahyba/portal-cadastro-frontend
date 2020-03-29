import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.scss']
})
export class ValorComponent implements OnInit, AfterViewInit {

  @Input() totalPrice: number = 0;
  totalDiscount: number = 0;
  totalDiscountControl = new FormControl(0,
    [Validators.min(0), Validators.max(100), Validators.pattern('[0-9]{0,3}')]);

  totalPriceControl = new FormControl('', [Validators.required, Validators.min(1)]);

  @Input() disabled: string;
  @Input() injectedDiscount: number = 0;
  @Input() parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.totalPriceControl.setValue(this.totalPrice);
    this.parentFormGroup.registerControl('totalDiscount', this.totalDiscountControl);
    this.parentFormGroup.registerControl('totalPrice', this.totalPriceControl);
    this.parentFormGroup.controls.totalPrice.disable();
    this.totalDiscount = this.parentFormGroup.controls.totalDiscount.value;
  }

  ngAfterViewInit(){

    setTimeout(() => {

      if (this.injectedDiscount){
        this.parentFormGroup.controls.totalDiscount.setValue(this.injectedDiscount);
      }

      if (this.disabled === 'disabled'){
        this.parentFormGroup.controls.totalDiscount.disable();
        this.parentFormGroup.removeControl('totalDiscount');
        this.parentFormGroup.removeControl('totalPrice');
      }

    }, 0);

  }

  returnTotal(){
    this.totalPriceControl.setValue(this.totalPrice);
    return this.totalPrice*(1-this.totalDiscount/100);

  }
}
