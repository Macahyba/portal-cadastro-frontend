import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  @Input() parentFormGroup : FormGroup;
  @Output() dateWasSelected = new EventEmitter<Date>();
  @Input() control: string;

  date = new FormControl(new Date(), Validators.required);

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br');
    this.parentFormGroup.registerControl(this.control, this.date);
    this.selected(this.date.value);
  }

  selected(date){
    this.dateWasSelected.emit(date);
  }

}
