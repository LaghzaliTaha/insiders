import { TestBed, inject } from '@angular/core/testing';

import { SendsimplemailService } from './sendsimplemail.service';

describe('SendsimplemailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendsimplemailService]
    });
  });

  it('should be created', inject([SendsimplemailService], (service: SendsimplemailService) => {
    expect(service).toBeTruthy();
  }));
});
