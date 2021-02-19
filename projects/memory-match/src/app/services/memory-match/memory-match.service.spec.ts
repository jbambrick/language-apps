import { TestBed } from '@angular/core/testing';

import { MemoryMatchService } from './memory-match.service';

describe('MemoryMatchService', () => {
  let service: MemoryMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
