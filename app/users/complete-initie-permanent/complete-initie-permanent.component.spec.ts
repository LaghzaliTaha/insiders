import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInitiePermanentComponent } from './complete-initie-permanent.component';

describe('CompleteInitiePermanentComponent', () => {
  let component: CompleteInitiePermanentComponent;
  let fixture: ComponentFixture<CompleteInitiePermanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteInitiePermanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInitiePermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
