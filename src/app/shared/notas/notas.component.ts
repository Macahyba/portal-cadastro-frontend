import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit, OnChanges {

  @Input() parentFormGroup: FormGroup;
  @Input() injectedNotaDeEntrada: string;
  @Input() injectedSapNotification: string;
  @Input() updateNotaFiscal: string;
  @Input() injectedNotaFiscal: string;
  @Input() injectedWarranty: boolean;
  @Input() disabled: string;

  notaDeEntrada = this._fb.control('', Validators.required);
  sapNotification = this._fb.control('', Validators.required);
  notaFiscal = this._fb.control('');
  warranty = this._fb.control('');

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.parentFormGroup.registerControl('notaDeEntrada', this.notaDeEntrada);
    this.parentFormGroup.registerControl('sapNotification', this.sapNotification);
    this.parentFormGroup.registerControl('notaFiscal', this.notaFiscal);
    this.parentFormGroup.registerControl('warranty', this.warranty);
  }

  ngOnChanges(){
    setTimeout(() => {

      if (this.injectedNotaDeEntrada) this.parentFormGroup.controls.notaDeEntrada.setValue(this.injectedNotaDeEntrada);
      if (this.injectedSapNotification) this.parentFormGroup.controls.sapNotification.patchValue(this.injectedSapNotification);
      if (this.injectedWarranty) this.parentFormGroup.controls.warranty.setValue(this.injectedWarranty);
      if (this.injectedNotaFiscal) this.parentFormGroup.controls.notaFiscal.setValue(this.injectedNotaFiscal);

      if (this.disabled) {
        this.parentFormGroup.controls.notaDeEntrada.disable();
        this.parentFormGroup.controls.sapNotification.disable();
        this.parentFormGroup.controls.warranty.disable();
      }
    }, 0);
  }

}
