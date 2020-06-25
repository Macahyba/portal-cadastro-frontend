import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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

  @ViewChild('data') el: ElementRef;

  date = new FormControl(new Date(), Validators.required);
  formattedDate: string = `${String("00" + (this.date.value.getDate())).slice(-2)}/${String("00" + (this.date.value.getMonth()+1)).slice(-2)}/${this.date.value.getFullYear()}`;

  constructor(
      private _adapter: DateAdapter<any>,
      private _cdr: ChangeDetectorRef,
      private _renderer: Renderer2) { }

  ngOnInit() {
    this._adapter.setLocale('pt-br');
    this.parentFormGroup.registerControl(this.control, this.date);

    if (this.disabled) {
      this.date.disable();
      this.parentFormGroup.removeControl(this.control);
    }
    this._cdr.detectChanges();
    if (this.el) this._renderer.setProperty(this.el.nativeElement, 'value', this.formattedDate);

  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date.setValue(event.value);
  }

}
