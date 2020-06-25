import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReparoDetailComponent } from './reparo-detail.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RepairService } from 'src/app/service/repair.service';
import { RepairServiceMock } from 'src/app/mock/repair-service-mock';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AuthenticationServiceMock } from 'src/app/mock/authentication-service-mock';
import { By } from '@angular/platform-browser';
import { RepairModel } from 'src/app/model/repair.model';

describe('ReparoDetailComponent', () => {
  let component: ReparoDetailComponent;
  let fixture: ComponentFixture<ReparoDetailComponent>;
  let repairService: RepairServiceMock;
  let el: HTMLElement;
  let btn: HTMLElement;
  let repair: RepairModel;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoDetailComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatExpansionModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule
      ],
      providers: [
        { provide: RepairService, useClass: RepairServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoDetailComponent);
    component = fixture.componentInstance;

    repairService = TestBed.get(RepairServiceMock);
    repair = repairService.getOneRepair().value;

    component.id = 1;

    fb = TestBed.get(FormBuilder);

    el = fixture.debugElement.query(By.css('form')).nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a reparoDetailForm', () => {
    expect(component.repairFormGroup).toBeTruthy();
  })

  it('should register reparo.id in the reparoDetailForm', fakeAsync(() => {
    expect(component.repairFormGroup.controls.id.value).toEqual(repair.id);
  }))

  it('should load the role',() => {
    expect(component.role).toEqual("admin");
  })

  it('should submit the form when pressing the button', <any>fakeAsync((): void => {
    spyOn(component, 'submitForm');
    fixture.whenStable();
    fixture.detectChanges();
    btn = el.querySelector('#atualizar');
    btn.click();
    tick();
    expect(component.submitForm).toHaveBeenCalledTimes(1);
  }))

});
