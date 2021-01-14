import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajListePiloteComponent } from './maj-liste-pilote.component';

describe('MajListePiloteComponent', () => {
  let component: MajListePiloteComponent;
  let fixture: ComponentFixture<MajListePiloteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajListePiloteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajListePiloteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
