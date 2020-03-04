import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparoListComponent } from './reparo-list.component';

describe('ReparoListComponent', () => {
  let component: ReparoListComponent;
  let fixture: ComponentFixture<ReparoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
