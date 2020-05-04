import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasComponent } from './notas.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepairServiceMock } from 'src/app/mock/repair-service-mock';
import { RepairService } from 'src/app/service/repair.service';

describe('NotasComponent', () => {
  describe('given the NotasComponent', () => {
    let component: NotasComponent;
    let fixture: ComponentFixture<NotasComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ NotasComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatCheckboxModule,
          MatCardModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NotasComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should register notaDeEntrada in the parentForm', () =>{
      expect(component.parentFormGroup.controls.notaDeEntrada).toBeTruthy();
    })

    it('should register sapNotification in the parentForm', () =>{
      expect(component.parentFormGroup.controls.sapNotification).toBeTruthy();
    })

    it('should register warranty in the parentForm', () =>{
      expect(component.parentFormGroup.controls.warranty).toBeTruthy();
    })
  });

  describe('given the NotasComponent has injectedFields', () => {
    let component: NotasComponent;
    let fixture: ComponentFixture<NotasComponent>;
    let form: FormBuilder;
    let repairService: RepairServiceMock

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ NotasComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatCheckboxModule,
          MatCardModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: RepairService, useClass: RepairServiceMock}
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NotasComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      repairService = TestBed.get(RepairService);

      component.updateNotaFiscal = true;
      component.injectedNotaDeEntrada$ = repairService.getNotaDeEntrada();
      component.injectedSapNotification$ = repairService.getSapNotification();
      component.injectedNotaFiscal$ = repairService.getNotaFiscal();
      component.injectedWarranty$ = repairService.getWarranty();

      fixture.detectChanges();
    });

    it('should load the notaDeEntrada', () =>{
      expect(component.notaDeEntrada.value).toEqual("999999");
    })

    it('should load the sapNotification', () =>{
      expect(component.sapNotification.value).toEqual("888888");
    })

    it('should load the notaFiscal', () =>{
      expect(component.notaFiscal.value).toEqual("777777");
    })

    it('should load the warranty', () =>{
      expect(component.warranty.value).toEqual(true)
    })
  });

  describe('given the NotasComponent is disabled', () => {
    let component: NotasComponent;
    let fixture: ComponentFixture<NotasComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ NotasComponent ],
        imports: [
          ReactiveFormsModule,
          MatInputModule,
          MatCheckboxModule,
          MatCardModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NotasComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});
      component.disabled = true;

      fixture.detectChanges();
    });

    it('should not register notaDeEntrada', () => {
      expect(component.parentFormGroup.controls.notaDeEntrada).toBeUndefined();
    })

    it('should not register sapNotification', () => {
      expect(component.parentFormGroup.controls.sapNotification).toBeUndefined();
    })

    it('should not register warranty', () => {
      expect(component.parentFormGroup.controls.warranty).toBeUndefined();
    })

  });

})
