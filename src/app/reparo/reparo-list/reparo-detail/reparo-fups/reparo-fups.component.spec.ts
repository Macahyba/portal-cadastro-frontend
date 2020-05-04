import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparoFupsComponent } from './reparo-fups.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatExpansionModule, MatSlideToggleModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepairServiceMock } from 'src/app/mock/repair-service-mock';
import { ReparoFupComponentMock } from 'src/app/mock/reparo-fup-component-mock';
import { RepairFupModel } from 'src/app/model/repair-fup.model';

describe('given the ReparoFupsComponent', () => {
  let component: ReparoFupsComponent;
  let fixture: ComponentFixture<ReparoFupsComponent>;
  let form: FormBuilder;
  let repairService: RepairServiceMock;
  let el: HTMLElement;
  let fups: RepairFupModel[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoFupsComponent, ReparoFupComponentMock ],
      imports: [
        ReactiveFormsModule,
        MatExpansionModule,
        MatSlideToggleModule,
        BrowserAnimationsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoFupsComponent);
    component = fixture.componentInstance;

    form = TestBed.get(FormBuilder);
    component.parentFormGroup = form.group({});

    repairService = TestBed.get(RepairServiceMock);
    component.repairFups$ = repairService.getRepairFups();

    component.showNewFup = true;

    el = fixture.debugElement.nativeElement;

    fups = component.repairFups$.value;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register the repairFupFormGroup on the parentForm', () => {
    expect(component.parentFormGroup.controls.repairFups).toBeTruthy();
  });

  it('should load the repairFupNovo', () => {

    expect(el.querySelector('#fup-novo')).toBeTruthy();
  });

  it('should load the repairFups', () => {

    fups.forEach(fup => {
      expect(el.querySelector(`#fup-${fup.id}`)).toBeTruthy();
    })

  });

});
