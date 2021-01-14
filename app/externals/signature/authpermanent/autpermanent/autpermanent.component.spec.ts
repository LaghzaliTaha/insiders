import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutpermanentComponent } from './autpermanent.component';

describe('AutpermanentComponent', () => {
  let component: AutpermanentComponent;
  let fixture: ComponentFixture<AutpermanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutpermanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutpermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
