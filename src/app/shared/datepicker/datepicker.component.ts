import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  @Input() dateFormGroup : FormGroup;
  @Output() dateWasSelected = new EventEmitter<Date>();

  date = new FormControl(new Date(), Validators.required);

  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br'); 
    this.dateFormGroup.registerControl('creationDate', this.date);
    this.selected(this.date.value);
  }

  selected(date){
    this.dateWasSelected.emit(date);
  }

}
