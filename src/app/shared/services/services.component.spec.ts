import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesComponent } from './services.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ServiceServiceMock } from 'src/app/mock/service-service-mock';
import { ServiceService } from 'src/app/service/service.service';
import { By } from '@angular/platform-browser';

describe('ServicesComponent', () => {

  describe('given the ServicesComponent', () => {
    let component: ServicesComponent;
    let fixture: ComponentFixture<ServicesComponent>;
    let form: FormBuilder;
    let serviceService: ServiceServiceMock;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ServicesComponent ],
        imports: [
          ReactiveFormsModule,
          MatTableModule,
          MatCheckboxModule,
          MatCardModule,
          HttpClientModule
        ],
        providers:[
          { provide: ServiceService, useClass: ServiceServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ServicesComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      serviceService = TestBed.get(ServiceServiceMock);

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should register ServiceForm in the parentForm', () => {
      expect(component.parentFormGroup.controls.services).toBeTruthy();
    })

    it('should load the services', () => {
      expect(component.services).toEqual(serviceService.getAll().value);
    })

  });

  describe('given the ServicesComponent has injectedServices', () => {
    let component: ServicesComponent;
    let fixture: ComponentFixture<ServicesComponent>;
    let form: FormBuilder;
    let serviceService: ServiceServiceMock;
    let el: HTMLElement;
    let chk;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ServicesComponent ],
        imports: [
          ReactiveFormsModule,
          MatTableModule,
          MatCheckboxModule,
          MatCardModule,
          HttpClientModule
        ],
        providers:[
          { provide: ServiceService, useClass: ServiceServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ServicesComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      serviceService = TestBed.get(ServiceServiceMock);
      component.injectedServices$ = serviceService.getInjectedServices();

      el = fixture.debugElement.query(By.css('form')).nativeElement;

      chk = el.querySelectorAll('input:checked');

      fixture.detectChanges();
    });

    // it('should check the loaded services', (() => {

    //   // console.log(chk)
    // }))

  });

});
