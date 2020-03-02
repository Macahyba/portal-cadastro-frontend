import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertReparoComponent } from './insert-reparo.component';

describe('InsertReparoComponent', () => {
  let component: InsertReparoComponent;
  let fixture: ComponentFixture<InsertReparoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertReparoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertReparoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
