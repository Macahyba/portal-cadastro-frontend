import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit, OnChanges {

  @Input() parentFormGroup : FormGroup;
  @Input() control: string;
  @Input() injectedDate: Date;
  @Input() disabled: string;

  date = new FormControl(new Date(), Validators.required);

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br');
    this.parentFormGroup.registerControl(this.control, this.date);
  }

  ngOnChanges(){
    setTimeout(() => {
      // if (this.injectedDate){
      //   console.log(this.injectedDate)
      //   this.parentFormGroup.get(this.control).setValue(this.injectedDate);
      // }
      if (this.disabled){
        this.date.disable();
      }
    }, 0);
  }

}
