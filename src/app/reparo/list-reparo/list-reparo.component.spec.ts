import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReparoComponent } from './list-reparo.component';

describe('ListReparoComponent', () => {
  let component: ListReparoComponent;
  let fixture: ComponentFixture<ListReparoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReparoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReparoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
