import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReferentsComponent } from './list-referents.component';

describe('ListReferentsComponent', () => {
  let component: ListReferentsComponent;
  let fixture: ComponentFixture<ListReferentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReferentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReferentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
