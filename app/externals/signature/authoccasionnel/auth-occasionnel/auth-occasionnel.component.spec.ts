import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOccasionnelComponent } from './auth-occasionnel.component';

describe('AuthOccasionnelComponent', () => {
  let component: AuthOccasionnelComponent;
  let fixture: ComponentFixture<AuthOccasionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthOccasionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOccasionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
