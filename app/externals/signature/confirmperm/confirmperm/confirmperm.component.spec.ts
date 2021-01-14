import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpermComponent } from './confirmperm.component';

describe('ConfirmpermComponent', () => {
  let component: ConfirmpermComponent;
  let fixture: ComponentFixture<ConfirmpermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmpermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmpermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
