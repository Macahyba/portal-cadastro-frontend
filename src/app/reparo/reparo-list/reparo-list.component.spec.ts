import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReparoListComponent } from './reparo-list.component';
import { DummyComponentMock } from 'src/app/mock/dummy-component-mock';
import { RouterTestingModule } from '@angular/router/testing';
import { RepairService } from 'src/app/service/repair.service';
import { RepairServiceMock } from 'src/app/mock/repair-service-mock';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('ReparoListComponent', () => {
  let component: ReparoListComponent;
  let fixture: ComponentFixture<ReparoListComponent>;
  let repairService: RepairServiceMock;
  let el: HTMLElement;
  let btn: HTMLElement;
  let rep: HTMLElement;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoListComponent, DummyComponentMock ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'reparos/:id',
            component: DummyComponentMock
          },{
            path: 'reparos-new',
            component: DummyComponentMock
           }
        ]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule
      ],
      providers: [
        { provide: RepairService, useClass: RepairServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoListComponent);
    component = fixture.componentInstance;

    repairService = TestBed.get(RepairServiceMock);

    el = fixture.debugElement.nativeElement;
    btn = el.querySelector('#insert');

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the data table', () => {

    const reps = repairService.getRepairs()
    expect(component.dataSource.filteredData).toEqual(reps.value.slice().reverse());
  });

  it('should redirect to "/reparos-new" when pressing the insert button', fakeAsync(() => {

    btn.click();
    tick();
    expect(location.path()).toEqual("/reparos-new");

  }))

  it('should redirect to "/reparos:id" when clicking at a repair', fakeAsync(() => {

    rep = el.querySelector('#rep-1');
    rep.click();
    tick();
    expect(location.path()).toEqual("/reparos/1");

  }))
});
