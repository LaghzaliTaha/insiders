import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPeriodesComponent } from './list-periodes.component';

describe('ListPeriodesComponent', () => {
  let component: ListPeriodesComponent;
  let fixture: ComponentFixture<ListPeriodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPeriodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
