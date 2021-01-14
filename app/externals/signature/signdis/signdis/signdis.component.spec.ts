import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigndisComponent } from './signdis.component';

describe('SigndisComponent', () => {
  let component: SigndisComponent;
  let fixture: ComponentFixture<SigndisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigndisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigndisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
