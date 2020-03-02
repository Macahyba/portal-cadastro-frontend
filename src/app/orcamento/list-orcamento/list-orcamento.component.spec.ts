import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrcamentoComponent } from './list-orcamento.component';

describe('ListOrcamentoComponent', () => {
  let component: ListOrcamentoComponent;
  let fixture: ComponentFixture<ListOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
