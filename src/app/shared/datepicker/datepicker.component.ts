import { Component, OnInit, NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

@NgModule({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
  ],
}) 
export class DatepickerComponent implements OnInit {

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br'); 
  }

}
