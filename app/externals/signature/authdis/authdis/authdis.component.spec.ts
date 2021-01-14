import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthdisComponent } from './authdis.component';

describe('AuthdisComponent', () => {
  let component: AuthdisComponent;
  let fixture: ComponentFixture<AuthdisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthdisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthdisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
