import { TestBed, inject } from '@angular/core/testing';

import { SendmailService } from './sendmail.service';

describe('SendmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendmailService]
    });
  });

  it('should be created', inject([SendmailService], (service: SendmailService) => {
    expect(service).toBeTruthy();
  }));
});
