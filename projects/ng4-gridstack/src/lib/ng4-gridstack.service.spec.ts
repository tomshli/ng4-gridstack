import { TestBed } from '@angular/core/testing';

import { Ng4GridstackService } from './ng4-gridstack.service';

describe('Ng4GridstackService', () => {
  let service: Ng4GridstackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ng4GridstackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
