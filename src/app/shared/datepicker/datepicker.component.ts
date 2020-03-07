import { Component, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  @Output() dateWasSelected = new EventEmitter<Date>();

  date = new FormControl(new Date());

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br'); 
    this.selected(this.date.value);
  }

  selected(date: Date){
    this.dateWasSelected.emit(date);
  }

}
