import { TestBed, inject } from '@angular/core/testing';

import { ReferentsService } from './referents.service';

describe('ReferentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferentsService]
    });
  });

  it('should be created', inject([ReferentsService], (service: ReferentsService) => {
    expect(service).toBeTruthy();
  }));
});
