import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.scss']
})
export class ValorComponent implements OnInit {

  @Input() totalPrice: number = 0;
  totalDiscount$ = new BehaviorSubject<number>(0);
  totalDiscountControl = this._fb.control(0,
    [Validators.min(0), Validators.max(100), Validators.pattern('[0-9]{0,3}')]);

  totalPriceControl = this._fb.control('', [Validators.required, Validators.min(1)]);

  @Input() disabled: boolean;
  @Input() injectedDiscount$ = new BehaviorSubject<number>(0);
  @Input() parentFormGroup: FormGroup;

  constructor(private _fb: FormBuilder, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.totalPriceControl.setValue(this.totalPrice);
    this.parentFormGroup.registerControl('totalDiscount', this.totalDiscountControl);
    this.parentFormGroup.registerControl('totalPrice', this.totalPriceControl);
    this.parentFormGroup.controls.totalPrice.disable();
    this.totalDiscount$.next(this.parentFormGroup.controls.totalDiscount.value);

    this.injectedDiscount$.subscribe(disc =>{
      this.parentFormGroup.controls.totalDiscount.setValue(disc);
    })

    if (this.disabled) this.parentFormGroup.controls.totalDiscount.disable();

    this._cdr.detectChanges();
  }

  returnTotal(){
    this.totalPriceControl.setValue(this.totalPrice);
    return this.totalPrice*(1-this.totalDiscountControl.value/100);
  }
}
