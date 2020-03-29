import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparoFupsComponent } from './reparo-fups.component';

describe('ReparoFupsComponent', () => {
  let component: ReparoFupsComponent;
  let fixture: ComponentFixture<ReparoFupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparoFupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparoFupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
