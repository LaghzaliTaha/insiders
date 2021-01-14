import { TestBed, inject } from '@angular/core/testing';

import { CanActivateSecurityService } from './can-activate-security.service';

describe('CanActivateSecurityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateSecurityService]
    });
  });

  it('should be created', inject([CanActivateSecurityService], (service: CanActivateSecurityService) => {
    expect(service).toBeTruthy();
  }));
});
