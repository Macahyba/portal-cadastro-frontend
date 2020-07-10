import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrcamentoListComponent } from './orcamento-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotationService } from 'src/app/service/quotation.service';
import { QuotationServiceMock } from 'src/app/mock/quotation-service-mock';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DummyComponentMock } from 'src/app/mock/dummy-component-mock';
import { By } from '@angular/platform-browser';

describe('OrcamentoListComponent', () => {
  let component: OrcamentoListComponent;
  let fixture: ComponentFixture<OrcamentoListComponent>;
  let quotationService: QuotationServiceMock;
  let el: HTMLElement;
  let btn: HTMLElement;
  let csv;
  let orc: HTMLElement;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoListComponent, DummyComponentMock ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'orcamentos/:id',
            component: DummyComponentMock
          },{
            path: 'orcamentos-new',
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
        { provide: QuotationService, useClass: QuotationServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoListComponent);
    component = fixture.componentInstance;

    quotationService = TestBed.get(QuotationServiceMock);

    el = fixture.debugElement.nativeElement;
    btn = el.querySelector('#insert');

    csv = fixture.debugElement.query(By.css('#csv')).nativeElement

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the data table', () => {

    const quots = quotationService.getAll()
    expect(component.dataSource.filteredData).toEqual(quots.value.slice().reverse());
  });

  it('should redirect to "/orcamentos-new" when pressing the insert button', fakeAsync(() => {

    btn.click();
    tick();
    expect(location.path()).toEqual("/orcamentos-new");

  }))

  it('should redirect to "/orcamentos:id" when clicking at a quotation', fakeAsync(() => {

    orc = el.querySelector('#orc-1');
    orc.click();
    tick();
    expect(location.path()).toEqual("/orcamentos/1");

  }))

  it('should call downloadCsv when pressing the download button', fakeAsync(() => {

    spyOn(component, 'downloadCsv');

    csv.click();
    tick();

    expect(component.downloadCsv).toHaveBeenCalledTimes(1);

  }))

});
