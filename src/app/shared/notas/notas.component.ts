import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {

  @Input() parentFormGroup: FormGroup;
  @Input() injectedNotaDeEntrada$ = new BehaviorSubject<string>("");
  @Input() injectedSapNotification$ = new BehaviorSubject<string>("");
  @Input() updateNotaFiscal: string;
  @Input() injectedNotaFiscal$ = new BehaviorSubject<string>("");
  @Input() injectedWarranty$ = new BehaviorSubject<boolean>(false);
  @Input() disabled: boolean;

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


    this.injectedNotaDeEntrada$.subscribe(nota =>{
      this.parentFormGroup.controls.notaDeEntrada.setValue(nota);
    })

    this.injectedSapNotification$.subscribe(nota =>{
      this.parentFormGroup.controls.sapNotification.setValue(nota);
    })

    this.injectedWarranty$.subscribe(nota =>{
      this.parentFormGroup.controls.warranty.setValue(nota);
    })

    this.injectedNotaFiscal$.subscribe(nota =>{
      this.parentFormGroup.controls.notaFiscal.setValue(nota);
    })

    if (this.disabled) {
      this.parentFormGroup.controls.notaDeEntrada.disable();
      this.parentFormGroup.controls.sapNotification.disable();
      this.parentFormGroup.controls.warranty.disable();
    }
  }

}
