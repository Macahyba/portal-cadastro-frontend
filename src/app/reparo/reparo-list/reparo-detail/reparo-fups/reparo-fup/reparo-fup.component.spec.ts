import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparoFupComponent } from './reparo-fup.component';

describe('ReparoFupComponent', () => {
  let component: ReparoFupComponent;
  let fixture: ComponentFixture<ReparoFupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoFupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoFupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
