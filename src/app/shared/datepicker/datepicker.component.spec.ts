import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DatepickerComponent', () => {
  describe('given the DatepickerComponent', () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DatepickerComponent ],
        imports: [
          ReactiveFormsModule,
          MatDatepickerModule,
          MatInputModule,
          MatCardModule,
          BrowserAnimationsModule,
          MatNativeDateModule
        ],
        providers: [
          DateAdapter
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatepickerComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      component.control = "creationDate";

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should register dateForm in the parentForm', () =>{
      expect(component.parentFormGroup.controls.creationDate).toBeTruthy();
    })
  });

  describe('given the DatepickerComponent is disabled', () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DatepickerComponent ],
        imports: [
          ReactiveFormsModule,
          MatDatepickerModule,
          MatInputModule,
          MatCardModule,
          BrowserAnimationsModule,
          MatNativeDateModule
        ],
        providers: [
          DateAdapter
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatepickerComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      component.control = "creationDate";
      component.disabled = true;

      fixture.detectChanges();
    });

    it('should should not register dateForm', () => {
      expect(component.parentFormGroup.controls.creationDate).toBeFalsy();
    });
  });

});
