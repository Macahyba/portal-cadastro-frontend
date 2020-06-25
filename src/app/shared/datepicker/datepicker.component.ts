import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  @Input() parentFormGroup : FormGroup;
  @Input() control: string;
  @Input() injectedDate$: BehaviorSubject<Date>;
  @Input() disabled: boolean;

  datePickerConfig = { 'format': 'DD/MM/YYYY HH:mm'}

  @ViewChild('dayPicker') datePicker: DatePickerComponent;

  date = new FormControl(moment(), Validators.required);
  dateForm = new FormControl(moment().toDate(), Validators.required);
  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br');
    this.parentFormGroup.registerControl(this.control, this.dateForm);

    if (this.disabled) {
      this.date.disable();
      this.parentFormGroup.removeControl(this.control);
    }

    if (this.injectedDate$) {
      this.injectedDate$.subscribe(i => this.date.setValue(moment(i).format('DD/MM/YYYY HH:mm')))
    }
  }

  changeDate(event){
    if (event && this.parentFormGroup.controls[this.control]) this.parentFormGroup.controls[this.control].setValue(event._d);
  }

  open(){
    this.datePicker.api.open();
  }

}
