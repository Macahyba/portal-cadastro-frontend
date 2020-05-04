import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentComponent } from './equipment.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule, MatAutocompleteModule, MatCardModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentService } from 'src/app/service/equipment.service';
import { EquipmentServiceMock } from 'src/app/mock/equipment-service-mock';
import { EquipmentModel } from 'src/app/model/equipament.model';

describe('EquipmentComponent', () => {

  describe('given the EquipmentComponent', () => {
    let component: EquipmentComponent;
    let fixture: ComponentFixture<EquipmentComponent>;
    let form: FormBuilder;
    let equipmentService: EquipmentServiceMock;
    let equipment: EquipmentModel;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ EquipmentComponent ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatAutocompleteModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: EquipmentService, useClass: EquipmentServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(EquipmentComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      equipmentService = TestBed.get(EquipmentServiceMock);
      equipment = equipmentService.getEquipment().value;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('injectedCustomer should be empty', () => {
      expect(component.injectedEquipment$).toBeUndefined();
    })

    it('should register equipmentForm in the parentForm', () => {
      expect(component.parentFormGroup.controls.equipment).toBeTruthy();
    })

    it('should register equipment.id in the parentForm', () => {
      expect(component.equipmentGroup.controls.id).toBeTruthy();
    })

    it('should register equipment.name in the parentForm', () => {
      expect(component.equipmentGroup.controls.name).toBeTruthy();
    })

    it('should register equipment.serialNumber in the parentForm', () => {
      expect(component.equipmentGroup.controls.serialNumber).toBeTruthy();
    })

    it('form should be valid when filled correctly', () => {

      component.equipmentGroup.controls.id.setValue(equipment.id);
      component.equipmentGroup.controls.name.setValue(equipment.name);
      component.equipmentGroup.controls.serialNumber.setValue(equipment.serialNumber);

      expect(component.equipmentGroup.valid).toBeTruthy();
    })

  });

  describe('given the EquipmentComponent has injectedEquipment', () => {
    let component: EquipmentComponent;
    let fixture: ComponentFixture<EquipmentComponent>;
    let form: FormBuilder;
    let equipmentService: EquipmentServiceMock;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ EquipmentComponent ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatAutocompleteModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: EquipmentService, useClass: EquipmentServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(EquipmentComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      equipmentService = TestBed.get(EquipmentServiceMock);
      component.injectedEquipment$ = equipmentService.getEquipment();

      fixture.detectChanges();
    });

    it('should load the injectedEquipment.id', () =>{
      expect(component.equipmentGroup.controls.id.value).toEqual(1);
    })

    it('should load the injectedEquipment.name', () =>{
      expect(component.equipmentGroup.controls.name.value).toEqual("name");
    })

    it('should load the injectedEquipment.serialNumber', () =>{
      expect(component.equipmentGroup.controls.serialNumber.value).toEqual("serialNumber");
    })

  });

  describe('given the EquipmentComponent is disabled', () => {
    let component: EquipmentComponent;
    let fixture: ComponentFixture<EquipmentComponent>;
    let form: FormBuilder;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ EquipmentComponent ],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatAutocompleteModule,
          MatCardModule,
          HttpClientModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: EquipmentService, useClass: EquipmentServiceMock }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(EquipmentComponent);
      component = fixture.componentInstance;

      form = TestBed.get(FormBuilder);
      component.parentFormGroup = form.group({});

      component.disabled = true;

      fixture.detectChanges();
    });

    it('should not register the form', () => {

      expect(component.parentFormGroup.controls.equipment).toBeUndefined();
    })

  });
});
