import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInitieComponent } from './list-initie.component';

describe('ListInitieComponent', () => {
  let component: ListInitieComponent;
  let fixture: ComponentFixture<ListInitieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInitieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
