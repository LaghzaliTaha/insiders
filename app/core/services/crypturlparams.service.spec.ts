import { TestBed, inject } from '@angular/core/testing';

import { CrypturlparamsService } from './crypturlparams.service';

describe('CrypturlparamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrypturlparamsService]
    });
  });

  it('should be created', inject([CrypturlparamsService], (service: CrypturlparamsService) => {
    expect(service).toBeTruthy();
  }));
});
