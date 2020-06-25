import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparoFupComponent } from './reparo-fup.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from 'src/app/shared/datepicker/datepicker.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RepairServiceMock } from 'src/app/mock/repair-service-mock';
import { UserModel } from 'src/app/model/user.model';
import { DpDatePickerModule } from 'ng2-date-picker';

describe('ReparoFupComponent', () => {
  describe('given the ReparoFupComponent', () => {
    let component: ReparoFupComponent;
    let fixture: ComponentFixture<ReparoFupComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ReparoFupComponent,
          DatepickerComponent
        ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatProgressBarModule,
          MatIconModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule,
          MatButtonModule,
          DpDatePickerModule
        ],
        providers: [
          DateAdapter
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ReparoFupComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormArray = form.array([]);

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should register repairFupFormGroup in the parentFormArray', () => {
      expect(component.parentFormArray.controls[0]).toBeTruthy();
    })

    it('should register repairFup.id in the repairFupFormGroup', () => {
      expect(component.repairFupFormGroup.controls.id).toBeTruthy();
    })

    it('should register repairFup.description in the repairFupFormGroup', () => {
      expect(component.repairFupFormGroup.controls.description).toBeTruthy();
    })

    it('should register repairFup.spareParts in the repairFupFormGroup', () => {
      expect(component.repairFupFormGroup.controls.spareParts).toBeTruthy();
    })

    it('should register repairFup.user in the repairFupFormGroup', () => {
      expect(component.repairFupFormGroup.controls.user).toBeTruthy();
    })

  });

  describe('given the ReparoFupComponent has injectedRepairFup', () => {
    let component: ReparoFupComponent;
    let fixture: ComponentFixture<ReparoFupComponent>;
    let form: FormBuilder;
    let repairFupService: RepairServiceMock;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ReparoFupComponent,
          DatepickerComponent
        ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatProgressBarModule,
          MatIconModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule,
          MatButtonModule,
          DpDatePickerModule
        ],
        providers: [
          DateAdapter
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ReparoFupComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormArray = form.array([]);

      repairFupService = TestBed.get(RepairServiceMock);

      component.injectedRepairFup = repairFupService.getRepairFup();

      fixture.detectChanges();
    });

    it('should load the repairFup.id', () =>{
      fixture.detectChanges();
      expect(component.repairFupFormGroup.controls.id.value).toEqual(1)
    })

    it('should load the repairFup.description', () =>{
      fixture.detectChanges();
      expect(component.repairFupFormGroup.controls.description.value).toEqual("description1")
    })

    it('should load the repairFup.spareParts', () =>{
      fixture.detectChanges();
      expect(component.repairFupFormGroup.controls.spareParts.value)
      .toEqual([
        { id:1, partNumber:"partNumber1" },
        { id:2, partNumber:"partNumber2" }
      ])
    })

    it('should load the repairFup.user', () =>{
      fixture.detectChanges();
      expect(component.repairFupFormGroup.controls.user.value).toEqual(new UserModel(1, "test user1", "test1@mail", "Boss", "99999999"))
    })

  });

  describe('given the ReparoFupComponent is disabled', () => {
    let component: ReparoFupComponent;
    let fixture: ComponentFixture<ReparoFupComponent>;
    let form: FormBuilder;
    let repairFupService: RepairServiceMock;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ReparoFupComponent,
          DatepickerComponent
        ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatProgressBarModule,
          MatIconModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule,
          MatButtonModule,
          DpDatePickerModule
        ],
        providers: [
          DateAdapter
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ReparoFupComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormArray = form.array([]);

      component.disabled = true;

      fixture.detectChanges();
    });

    it('should register repairFupFormGroup in the parentFormArray', () => {
      expect(component.parentFormArray.controls[0]).toBeUndefined();
    })

  });
});
