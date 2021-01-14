import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisComponent } from './list-dis.component';

describe('ListDisComponent', () => {
  let component: ListDisComponent;
  let fixture: ComponentFixture<ListDisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
