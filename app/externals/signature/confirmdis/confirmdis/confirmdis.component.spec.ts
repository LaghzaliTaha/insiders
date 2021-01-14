import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdisComponent } from './confirmdis.component';

describe('ConfirmdisComponent', () => {
  let component: ConfirmdisComponent;
  let fixture: ComponentFixture<ConfirmdisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmdisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmdisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
