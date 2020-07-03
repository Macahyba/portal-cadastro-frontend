import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCrudComponent } from './equipment-crud.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentServiceMock } from 'src/app/mock/equipment-service-mock';
import { EquipmentService } from 'src/app/service/equipment.service';

describe('EquipmentCrudComponent', () => {
  let component: EquipmentCrudComponent;
  let fixture: ComponentFixture<EquipmentCrudComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCrudComponent ],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatRadioModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: EquipmentService, useClass: EquipmentServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // de = fixture.debugElement.query(By.css('form'));
    // el = de.nativeElement;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
