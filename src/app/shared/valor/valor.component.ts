import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { ServiceModel } from 'src/app/model/service.model';
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
  @Input() valorFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.totalPriceControl.setValue(this.totalPrice);
    this.valorFormGroup.registerControl('totalDiscount', this.totalDiscountControl);
    this.valorFormGroup.registerControl('totalPrice', this.totalPriceControl);
    this.valorFormGroup.controls.totalPrice.disable();
    this.totalDiscount = this.valorFormGroup.controls.totalDiscount.value;
  }

  ngAfterViewInit(){

    setTimeout(() => {

      if (this.injectedDiscount){
        this.valorFormGroup.controls.totalDiscount.setValue(this.injectedDiscount);
      }

      if (this.disabled === 'disabled'){
        this.valorFormGroup.controls.totalDiscount.disable();
        this.valorFormGroup.removeControl('totalDiscount');
        this.valorFormGroup.removeControl('totalPrice');
      }

    }, 0);

  }

  returnTotal(){
    this.totalPriceControl.setValue(this.totalPrice);
    return this.totalPrice*(1-this.totalDiscount/100);

  }
}
