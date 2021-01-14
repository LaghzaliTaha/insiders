import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoccasionnelComponent } from './signoccasionnel.component';

describe('SignoccasionnelComponent', () => {
  let component: SignoccasionnelComponent;
  let fixture: ComponentFixture<SignoccasionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoccasionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoccasionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
