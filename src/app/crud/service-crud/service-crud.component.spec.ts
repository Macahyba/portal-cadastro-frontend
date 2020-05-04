import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCrudComponent } from './service-crud.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressBarModule, MatRadioModule, MatInputModule, MatOptionModule, MatSelectModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceService } from 'src/app/service/service.service';
import { ServiceServiceMock } from 'src/app/mock/service-service-mock';
import { By } from '@angular/platform-browser';

describe('ServiceCrudComponent', () => {
  let component: ServiceCrudComponent;
  let fixture: ComponentFixture<ServiceCrudComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCrudComponent ],
      imports: [
        ReactiveFormsModule,
        MatProgressBarModule,
        MatRadioModule,
        FormsModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ServiceService, useClass: ServiceServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT press the submitForm button if INVALID', () => {
    fixture.detectChanges();
    spyOn(component, 'submitForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submitForm).toHaveBeenCalledTimes(0);
  })
});
