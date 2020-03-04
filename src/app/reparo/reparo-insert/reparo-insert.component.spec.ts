import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparoInsertComponent } from './reparo-insert.component';

describe('ReparoInsertComponent', () => {
  let component: ReparoInsertComponent;
  let fixture: ComponentFixture<ReparoInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
