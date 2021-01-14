import { TestBed, inject } from '@angular/core/testing';

import { PeriodeService } from './periode.service';

describe('PeriodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeriodeService]
    });
  });

  it('should be created', inject([PeriodeService], (service: PeriodeService) => {
    expect(service).toBeTruthy();
  }));
});
