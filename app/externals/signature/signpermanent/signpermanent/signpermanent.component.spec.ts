import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignpermanentComponent } from './signpermanent.component';

describe('SignpermanentComponent', () => {
  let component: SignpermanentComponent;
  let fixture: ComponentFixture<SignpermanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignpermanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignpermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
