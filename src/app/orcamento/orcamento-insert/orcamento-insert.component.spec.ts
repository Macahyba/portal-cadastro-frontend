import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoInsertComponent } from './orcamento-insert.component';

describe('OrcamentoInsertComponent', () => {
  let component: OrcamentoInsertComponent;
  let fixture: ComponentFixture<OrcamentoInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
