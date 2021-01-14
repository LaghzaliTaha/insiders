import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmoccasComponent } from './confirmoccas.component';

describe('ConfirmoccasComponent', () => {
  let component: ConfirmoccasComponent;
  let fixture: ComponentFixture<ConfirmoccasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmoccasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmoccasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
