import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  @Input() parentFormGroup : FormGroup;
  @Input() control: string;
  @Input() injectedDate: Date;
  @Input() disabled: boolean;

  date = new FormControl(new Date(), Validators.required);

  constructor(private _adapter: DateAdapter<any>, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br');
    this.parentFormGroup.registerControl(this.control, this.date);

    if (this.disabled) this.date.disable();

    this._cdr.detectChanges();

  }

}
