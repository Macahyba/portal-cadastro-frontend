import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparoDetailComponent } from './reparo-detail.component';

describe('ReparoDetailComponent', () => {
  let component: ReparoDetailComponent;
  let fixture: ComponentFixture<ReparoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
