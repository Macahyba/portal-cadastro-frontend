import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOrcamentoComponent } from './insert-orcamento.component';

describe('InsertOrcamentoComponent', () => {
  let component: InsertOrcamentoComponent;
  let fixture: ComponentFixture<InsertOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
