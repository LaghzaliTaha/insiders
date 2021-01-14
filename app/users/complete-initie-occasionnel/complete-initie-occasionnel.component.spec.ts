import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInitieOccasionnelComponent } from './complete-initie-occasionnel.component';

describe('CompleteInitieOccasionnelComponent', () => {
  let component: CompleteInitieOccasionnelComponent;
  let fixture: ComponentFixture<CompleteInitieOccasionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteInitieOccasionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInitieOccasionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
