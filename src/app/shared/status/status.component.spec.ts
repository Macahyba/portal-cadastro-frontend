import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StatusServiceMock } from 'src/app/mock/status-service-mock';
import { StatusService } from 'src/app/service/status.service';

describe('StatusComponent', () => {
  describe('given the StatusComponent', () => {
    let component: StatusComponent;
    let fixture: ComponentFixture<StatusComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ StatusComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatSelectModule,
          MatCardModule,
          HttpClientModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: StatusService, useClass: StatusServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(StatusComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should register statusForm in the parentForm', () =>{
      expect(component.parentFormGroup.controls.status).toBeTruthy();
    })

    it('should register status.id in the statusForm', () =>{
      expect(component.statusGroup.controls.id).toBeTruthy();
    })

  });


  describe('given the StatusComponent has injectedStatus', () => {
    let component: StatusComponent;
    let fixture: ComponentFixture<StatusComponent>;
    let form: FormBuilder;
    let statusService: StatusServiceMock;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ StatusComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatSelectModule,
          MatCardModule,
          HttpClientModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: StatusService, useClass: StatusServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(StatusComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      statusService = TestBed.get(StatusServiceMock);
      component.injectedStatus$ = statusService.getOneStatus();

      fixture.detectChanges();
    });

    it('should load the id', () =>{
      expect(component.statusGroup.controls.id.value).toEqual(1);
    })

    it('should load the status', () =>{
      expect(component.status.value).toEqual("NOVO");
    })

  });

  describe('given the StatusComponent is disabled', () => {
    let component: StatusComponent;
    let fixture: ComponentFixture<StatusComponent>;
    let form: FormBuilder;
    let input: HTMLInputElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ StatusComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatSelectModule,
          MatCardModule,
          HttpClientModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: StatusService, useClass: StatusServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(StatusComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      component.disabled = true;
      fixture.detectChanges();

      input = fixture.debugElement.nativeElement.querySelector('input');

    });

    it('should not register status', () => {
      expect(component.parentFormGroup.controls.status).toBeUndefined();
    })

    it('should show status field as disabled text input', () => {
      expect(input).not.toBeNull();
    })

  });

});
