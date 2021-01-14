import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajListeCorrespondantComponent } from './maj-liste-correspondant.component';

describe('MajListeCorrespondantComponent', () => {
  let component: MajListeCorrespondantComponent;
  let fixture: ComponentFixture<MajListeCorrespondantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajListeCorrespondantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajListeCorrespondantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
